"use client";

import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
};

const navItems: NavItem[] = [
  { label: "Join early access", href: "/join" },
  { label: "Blog", href: "https://blog.avy.xyz", isExternal: true },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-neutral-800">
      <div className="max-w-[950px] mx-auto px-4 h-[80px] flex items-center justify-between">
        <Link href="/" className="h-8 w-32 bg-[url('/logo.png')] bg-contain bg-left bg-no-repeat"></Link>
        <nav className="flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;