"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <main className="w-full max-w-[950px] mx-auto px-4">
        <Link 
          href="/"
          className="text-neutral-400 hover:text-white flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-[15px] p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-neutral-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p>
                We collect the following information when you join our waitlist:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>x user name</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p>
                We use your x user name to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Notify you when our app becomes available</li>
                <li>Send you updates about our launch</li>
                <li>Provide you with early access opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
              <p>
                Your email address is stored securely in our database. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <a href="mailto:info@avy.xyz" className="text-white hover:text-neutral-300">
                    info@avy.xyz
                  </a>
                </p>
                <p className="text-neutral-300">
                  MJ Tech Ventures UG (haftungsbeschränkt)<br />
                  Schwarzbuchenweg 63<br />
                  Hamburg 22391<br />
                  Germany
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
              </p>
            </section>

            <p className="text-sm text-neutral-400 mt-8">
              Last updated: 5/4/2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 