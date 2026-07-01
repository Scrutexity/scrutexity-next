import { forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-xl border border-sand-deep bg-cream px-4 py-3 text-espresso placeholder:text-[#9b9085] focus:border-[#b9825f] focus:outline-none focus:ring-1 focus:ring-[#b9825f] transition-all [&:user-invalid]:border-[#b9825f] [&:user-invalid]:animate-[shake_0.4s_ease-in-out] [&:user-valid]:border-[#7f8f78] ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
