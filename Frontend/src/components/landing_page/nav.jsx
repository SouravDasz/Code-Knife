
import React from "react";

const Nav = () => {
  const navLinks = [
    "Docs",
    "Pricing",
    "Changelog",
    "Community",
    "Blog",
    "Stats",
  ];

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex h-[72px] w-full items-center justify-between px-8 md:px-[9%]">

        {/* Left: Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 2 29 9.5 16 17 3 9.5Z"
              fill="#91C8E5"
              stroke="#334155"
            />
            <path
              d="M3 9.5 16 17V30L3 22.5Z"
              fill="#5AA6CE"
              stroke="#334155"
            />
            <path
              d="M29 9.5 16 17V30L29 22.5Z"
              fill="#E5EEF3"
              stroke="#334155"
            />
            <path d="M16 5 24 9.5 16 14 8 9.5Z" fill="#D7EAF5" />
          </svg>

          <span className="text-[21px] font-bold tracking-tight text-neutral-800">
            helicone
          </span>
        </a>

        {/* Center: Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="whitespace-nowrap text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right: Action buttons */}
        <div className="flex shrink-0 items-center gap-3">

          {/* GitHub */}
          <a
            href="https://github.com/SouravDasz/Code-Knife.git"
            target="_blank"
            rel="noreferrer"
            className="flex h-[39px] items-center gap-2 rounded-[10px] border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.72.78 1.14 1.78 1.14 3.01 0 4.29-2.6 5.23-5.09 5.51.4.34.75 1.02.75 2.06v3.07c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            <span className="font-semibold">2K</span>
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className="hidden h-[39px] items-center rounded-[10px] bg-gray-100 px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 sm:flex"
          >
            Contact us
          </a>

          {/* Login */}
          <a
            href="#login"
            className="flex h-[39px] items-center rounded-[9px] bg-[#4DA3E8] px-[18px] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#318BD5]"
          >
            Log In
          </a>

        </div>
      </div>
    </header>
  );
};

export default Nav;
