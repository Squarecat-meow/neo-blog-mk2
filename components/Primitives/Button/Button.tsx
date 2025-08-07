import { ComponentPropsWithoutRef } from 'react';

interface IButton extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  children: string;
  className?: string;
}

export default function Button({ children, className, ...props }: IButton) {
  return (
    <button className={`py-2 border ${className}`} {...props}>
      {children}
    </button>
  );
}
