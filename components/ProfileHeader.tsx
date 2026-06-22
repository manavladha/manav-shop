"use client";
import Image from "next/image";
import { track } from "@vercel/analytics";

export default function ProfileHeader() {
  return (
    <div className="px-4 pt-6 pb-4">
      {/* Decorative stars */}
      <div className="relative">
        <span className="absolute -top-2 right-4 text-[#FFD84D] text-2xl select-none">✦</span>
        <span className="absolute top-8 right-10 text-[#FF5C5C] text-sm select-none">★</span>
      </div>

      {/* Avatar + Name row */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="relative flex-shrink-0 w-[72px] h-[72px] rounded-2xl border-ink shadow-card overflow-hidden bg-[#FFD84D]"
          style={{ border: "2.5px solid #1E1E1E", boxShadow: "4px 4px 0px #1E1E1E" }}
        >
          <Image
            src="/manav.png"
            alt="Manav Ladha"
            width={72}
            height={72}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div>
          <h1 className="font-display font-bold text-[22px] leading-tight text-[#1E1E1E]">
            Manav Ladha
          </h1>
          <p className="text-[#1E1E1E]/60 font-body text-[13px] mt-0.5 font-medium">
            @manavladha
          </p>
          {/* Verified-style badge */}
          <span
            className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-pixel bg-[#7BE495] text-[#1E1E1E]"
            style={{ border: "1.5px solid #1E1E1E" }}
          >
            ✦ CREATOR
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="font-body text-[14px] text-[#1E1E1E] leading-relaxed mb-4">
        Cool gadgets, toys, collectibles &amp; gifting finds from my reels. 🎮🧸✨
      </p>

      {/* Social buttons */}
      <div className="flex gap-2 flex-wrap">
        <SocialButton
          href="https://instagram.com/manavladha"
          bg="#FF5C5C"
          label="Instagram"
          onClick={() => track("social_click", { platform: "instagram" })}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          }
        />
        <SocialButton
          href="https://wa.me/919782519798"
          bg="#7BE495"
          label="WhatsApp"
          onClick={() => track("social_click", { platform: "whatsapp" })}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          }
        />
        <SocialButton
          href="mailto:manavladha6627@gmail.com"
          bg="#5CC8FF"
          label="Email"
          onClick={() => track("social_click", { platform: "email" })}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function SocialButton({
  href,
  bg,
  label,
  icon,
  onClick,
}: {
  href: string;
  bg: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="btn-arcade inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-display font-semibold text-[13px] text-[#1E1E1E]"
      style={{
        backgroundColor: bg,
        border: "2px solid #1E1E1E",
      }}
    >
      {icon}
      {label}
    </a>
  );
}
