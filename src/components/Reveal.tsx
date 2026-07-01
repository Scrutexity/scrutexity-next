import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className = '' }: RevealProps) {
  return (
    <div className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
