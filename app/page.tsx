"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!isValidEmail) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) throw error;
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting email:', error);
      setError('Failed to submit email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="h-[80px] w-full bg-[url('/logo.png')] bg-contain bg-center bg-no-repeat mb-12 block md:hidden"></div>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="w-full max-w-[950px] mx-auto px-4 flex-col-reverse flex md:flex-row gap-8 items-center mb-24 md:mb-0">
        <div className="flex-1 flex flex-col">
          <div className="h-[100px] w-full bg-[url('/logo.png')] bg-contain bg-[left_top] bg-no-repeat mb-12 hidden md:block"></div>
          <h1 className="text-4xl font-bold text-white mb-8 mt-8 md:mt-0">Scan. Tap. Trade. iOS-Native.</h1>
          <p className="text-muted-foreground mb-8 max-w-[500px]">
          Start trading instantly. No KYC. No email. No barriers. Powered by Hyperliquid technology. Operated independently.
          </p>
          <p className="text-muted-foreground mb-8 max-w-[500px]">
            We are launching to family & friends soon. Be one of them and get early access.
          </p>
          <div className="max-w-[500px]">
            {!isSubmitted ? (
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                  className="bg-neutral-900 w-full text-neutral-200 px-6 py-4 rounded-[15px] flex items-center gap-2 font-black text-[12px] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  disabled={!isValidEmail || isSubmitting} 
                  onClick={handleSubmit}
                  className={`${
                    isValidEmail && !isSubmitting
                      ? "bg-white cursor-pointer hover:bg-neutral-100" 
                      : "bg-neutral-600 cursor-not-allowed"
                  } text-black px-6 py-4 whitespace-nowrap rounded-[15px] flex items-center gap-2 font-bold text-[12px] disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Join waitlist <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-green-500/10 text-green-500 px-6 py-4 rounded-[15px] w-full text-center mt-4">
                Thank you! We&apos;ll be in touch soon.
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 text-red-500 text-sm mt-4 px-6 py-4 rounded-[15px] w-full text-center">
                {error}
              </div>
            )}
            <div className="border-neutral-800 border mt-8 mb-8"></div>
            <div className="flex space-x-6">
              <a
                href="https://x.com/avytrade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
              >
                <span className="sr-only">X (formerly Twitter)</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
              >
                <span className="sr-only">Telegram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="relative flex justify-end">
          <div className="aspect-[444/912] md:h-full md:min-w-[300px] h-[400px]">
            <div className="relative w-full h-full bg-[url('/mockup.png')] bg-contain bg-center bg-no-repeat z-10" />
            <div className="absolute inset-0 z-0 rounded-[15%] overflow-hidden md:p-4 p-2">
              <video 
                autoPlay 
                muted 
                loop
                playsInline
                className="inset-0 w-full h-full object-cover"
                poster="/poster.jpg"
              >
                <source src="/screen.webm" type="video/webm" />
                <source src="/screen.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-8 w-full flex justify-center items-center text-center">
        <div className="max-w-[950px] px-4 w-full">
          <a
            href="/privacy"
            className="text-neutral-400 hover:text-white text-sm"
          >
            Privacy Policy
          </a>
        </div>
        
      </footer>
    </div>
  );
}
