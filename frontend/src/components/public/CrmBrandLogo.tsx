import * as React from "react";

type CrmBrandLogoProps = {
  size?: "sm" | "md" | "lg" | "hero";
  showText?: boolean;
  dark?: boolean;
  onlyCrm?: boolean;
};

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  hero: "w-28 h-28 sm:w-36 sm:h-36"
};

export default function CrmBrandLogo({ size = "md", showText = true, dark = false, onlyCrm = false }: CrmBrandLogoProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className={`${sizeClasses[size]} shrink-0 rounded-2xl bg-white shadow-lg ring-1 ring-blue-100 flex items-center justify-center p-1.5 overflow-hidden`}>
        {imgError ? (
          <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label="CRM logo">
            <rect x="22" y="16" width="56" height="74" rx="8" ry="8" fill="none" stroke="#FF5349" strokeWidth="5.5" />
            <line x1="42" y1="22" x2="58" y2="22" stroke="#FF5349" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="50" cy="82" r="3" fill="#FF5349" />
            <path d="M 12 46 L 50 18 L 88 46" fill="none" stroke="#06132D" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="54" r="14" fill="none" stroke="#06132D" strokeWidth="4.5" />
            <line x1="50" y1="44" x2="50" y2="54" stroke="#06132D" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 43 49 A 9 9 0 1 0 57 49" fill="none" stroke="#FF5349" strokeWidth="4" strokeLinecap="round" />
          </svg>
        ) : (
          <img 
            src="/logo.jpg" 
            className="w-full h-full object-cover rounded-xl" 
            alt="CRM logo"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {showText && (
        <div className="min-w-0">
          <div className={`font-heading font-black tracking-tight leading-none ${dark ? "text-white" : "text-[#0B2369]"} ${size === "hero" ? "text-4xl sm:text-5xl" : "text-xl"}`}>
            CRM
          </div>
          {!onlyCrm && (
            <>
              <div className={`mt-1 font-bold uppercase tracking-[0.22em] leading-none ${dark ? "text-slate-200" : "text-slate-500"} ${size === "hero" ? "text-[10px] sm:text-xs" : "text-[8px]"}`}>
                Customer Relationship Management
              </div>
              <div className={`mt-1 font-bold uppercase tracking-[0.45em] leading-none ${dark ? "text-[#F05454]" : "text-[#F05454]"} ${size === "hero" ? "text-[10px]" : "text-[7px]"}`}>
                Since 2026
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

