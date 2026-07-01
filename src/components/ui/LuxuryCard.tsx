'use client';

interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function LuxuryCard({ children, className = '', hover = true }: LuxuryCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl ${hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''} transition-all duration-500 p-8 flex flex-col ${className}`}>
      {children}
    </div>
  );
}
