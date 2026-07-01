import { ReactNode } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium text-[#221f1b]">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-sm text-[#b9825f]">
          {error}
        </span>
      )}
    </div>
  );
}
