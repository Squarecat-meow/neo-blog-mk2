import { ComponentPropsWithoutRef } from 'react';

interface IInput extends ComponentPropsWithoutRef<'input'> {
  placeholder: string;
  className?: string;
}

export default function Input({ placeholder, className, ...props }: IInput) {
  return (
    <input
      className={`border border-slate-300 rounded-lg p-2 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
