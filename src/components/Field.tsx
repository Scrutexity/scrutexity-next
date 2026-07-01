import { ReactNode } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium text-espresso">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-sm text-clay">
          {error}
        </span>
      )}
    </div>
  );
}
