import { forwardRef, SelectHTMLAttributes } from 'react';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full appearance-none rounded-xl border border-sand-deep bg-cream px-4 py-3 text-espresso focus:border-[#b9825f] focus:outline-none focus:ring-1 focus:ring-[#b9825f] transition-all [&:user-invalid]:border-[#b9825f] [&:user-invalid]:animate-[shake_0.4s_ease-in-out] [&:user-valid]:border-[#7f8f78] ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
