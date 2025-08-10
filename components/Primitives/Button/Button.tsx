import { ComponentPropsWithoutRef } from 'react';

interface IButton extends ComponentPropsWithoutRef<'button'> {
  children: string;
  className?: string;
  variant: 'primary' | 'outline' | 'disabled';
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  variant,
  disabled = false,
  ...props
}: IButton) {
  const primaryClasses = 'bg-sky-300 hover:bg-sky-400';
  const outlineClasses = 'border border-slate-300 hover:bg-sky-400';
  const disabledClasses =
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed';

  const variantProps = {
    primary: primaryClasses,
    outline: outlineClasses,
    disabled: disabledClasses,
  };

  return (
    <button
      disabled={disabled}
      className={`py-2 rounded-lg transition-colors ${variantProps[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
