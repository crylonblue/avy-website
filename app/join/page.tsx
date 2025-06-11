"use client";

import Header from "../components/Header";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useEffect, useState } from "react";
import { Power } from "lucide-react";

interface WhitelistStatus {
  isWhitelisted: boolean;
  twitterHandle: string | null;
  accessGranted: boolean;
}

type WalletState = 
  | 'not_connected'
  | 'connected_not_whitelisted'
  | 'connected_pending_review'
  | 'connected_whitelisted'
  | 'checking';

export default function JoinPage() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    mutation: {
      onSuccess: () => {
        console.log("Connected successfully!");
      },
    },
  });
  const { disconnect } = useDisconnect();
  const [whitelistStatus, setWhitelistStatus] = useState<WhitelistStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const handleApply = async () => {
    if (!address || !twitterHandle) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/whitelist/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          twitterHandle,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setWhitelistStatus({
        isWhitelisted: true,
        twitterHandle: data.data.twitterHandle,
        accessGranted: false
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkWhitelist = async () => {
      if (!address) {
        setWhitelistStatus(null);
        return;
      }

      setIsChecking(true);
      try {
        const response = await fetch(`/api/whitelist/check?address=${address}`);
        const data = await response.json();
        setWhitelistStatus(data);
      } catch (error) {
        console.error('Error checking whitelist:', error);
        setWhitelistStatus(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkWhitelist();
  }, [address]);

  const getWalletState = (): WalletState => {
    if (!isConnected) return 'not_connected';
    if (isChecking) return 'checking';
    if (!whitelistStatus) return 'connected_not_whitelisted';
    if (whitelistStatus.accessGranted) return 'connected_whitelisted';
    if (whitelistStatus.isWhitelisted) return 'connected_pending_review';
    return 'connected_not_whitelisted';
  };

  const shouldShowApplicationForm = () => {
    const state = getWalletState();
    return state === 'connected_not_whitelisted';
  };

  const walletState = getWalletState();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Header />
      <main className="w-full max-w-[950px] mx-auto px-4 flex flex-col items-start justify-center mt-24">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent leading-tight">
          {isConnected ? "Welcome to Avy" : "Join the Future of Trading"}
        </h1>
        <p className="text-neutral-400 mb-12 max-w-[600px]">
          {walletState === 'not_connected' && 
            "Connect your wallet to join the early access program and be among the first to experience Avy's decentralized perps trading platform."}
          {walletState === 'checking' && 
            "Checking whitelist status..."}
          {walletState === 'connected_whitelisted' && 
            `You're connected with ${address?.slice(0, 6)}...${address?.slice(-4)} and you have access! Welcome to the early access program!`}
          {walletState === 'connected_pending_review' && 
            `You're connected with ${address?.slice(0, 6)}...${address?.slice(-4)} and your application is pending review. We'll notify you once approved.`}
          {walletState === 'connected_not_whitelisted' && 
            `You're connected with ${address?.slice(0, 6)}...${address?.slice(-4)}. Please apply for early access below.`}
        </p>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        {shouldShowApplicationForm() && (
          <div className="flex flex-col gap-4 mb-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Your Twitter handle"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:border-[#D93333] focus:outline-none"
            />
          </div>
        )}
        <div className="flex gap-4 w-full">
          <button
            onClick={() => (isConnected ? disconnect() : handleConnect())}
            disabled={isChecking}
            className="text-xs md:text-base px-5 py-3 md:px-8 md:py-3.5 border border-neutral-700 rounded-full text-white font-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnected ? <Power /> : "Connect Wallet"}
          </button>
          {shouldShowApplicationForm() && (
            <button
              onClick={handleApply}
              disabled={isSubmitting || !twitterHandle}
              className="text-xs md:text-base px-5 py-3 md:px-8 md:py-3.5 bg-[#D93333] rounded-full text-white font-medium cursor-pointer hover:bg-[#c42d2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Apply for Early Access"}
            </button>
          )}
        </div>
        
      </main>
    </div>
  );
} 