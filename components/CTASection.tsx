interface CTAProps {
  title: string;
  subtext: string;
  email: string;
  instagram: string;
  whatsapp: string;
}

export default function CTASection({ title, subtext, email, instagram, whatsapp }: CTAProps) {
  return (
    <div className="px-4 py-4 mb-6">
      <div
        className="relative bg-[#1E1E1E] rounded-2xl p-5 overflow-hidden"
        style={{ boxShadow: "6px 6px 0px #FFD84D" }}
      >
        {/* Decorative dots */}
        <span className="absolute top-3 right-5 text-[#FFD84D] text-xl select-none opacity-60">✦</span>
        <span className="absolute bottom-4 right-8 text-[#FF5C5C] text-sm select-none opacity-40">★</span>
        <span className="absolute bottom-3 left-4 text-[#5CC8FF] text-lg select-none opacity-40">◆</span>

        <h2 className="font-display font-bold text-[22px] text-white mb-2 leading-tight">
          {title} 🎬
        </h2>
        <p className="font-body text-[14px] text-white/60 mb-5">{subtext}</p>

        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${email}`}
            className="btn-arcade w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-[14px] bg-[#FFD84D] text-[#1E1E1E]"
            style={{ border: "2px solid #FFD84D", boxShadow: "3px 3px 0px #FFD84D" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Send an email →
          </a>

          <div className="flex gap-2">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-[13px] bg-[#FF5C5C] text-white"
              style={{ border: "2px solid #FF5C5C", boxShadow: "3px 3px 0px #FF5C5C" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>

            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-[13px] bg-[#7BE495] text-[#1E1E1E]"
              style={{ border: "2px solid #7BE495", boxShadow: "3px 3px 0px #7BE495" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
