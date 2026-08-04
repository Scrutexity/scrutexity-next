export default function ScrutexityLogo({ className = "h-7 w-auto text-espresso" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3 text-current select-none">
      {/* Vector Logo Mark (Solid Black/currentColor) */}
      <svg 
        viewBox="0 0 70 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Center Pole */}
          <line x1="35" y1="15" x2="35" y2="63" strokeWidth="2.2" />
          
          {/* The 'S' */}
          <path d="M 48 32 C 22 32, 22 46, 35 46 C 48 46, 48 60, 22 60" />
          
          {/* The 'X' */}
          <line x1="24" y1="34" x2="46" y2="58" />
          <line x1="46" y1="34" x2="24" y2="58" />
        </g>
      </svg>
 
      {/* Thin Vertical Divider */}
      <div className="h-10 w-[2px] bg-current opacity-25" />
 
      {/* Brand Text Rendered Separately in Theme Font */}
      <span className="font-sans font-bold text-xl tracking-[0.25em] text-current uppercase leading-none mt-[2px]">
        Scrutexity
      </span>
    </div>
  );
}
