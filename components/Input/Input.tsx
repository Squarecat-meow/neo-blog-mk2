import { ComponentPropsWithoutRef } from 'react';

interface IInput
  extends Omit<ComponentPropsWithoutRef<'input'>, 'placeholder'> {
  placeholder: string;
  className?: string;
}

export default function Input({ placeholder, className, ...props }: IInput) {
  return (
    <input
      className={`border-b p-2 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
