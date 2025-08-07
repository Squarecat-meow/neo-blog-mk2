import { Label as RadixLabel } from 'radix-ui';

interface ILabel {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

export default function Label({ label, children, htmlFor, className }: ILabel) {
  return (
    <>
      <RadixLabel.Root
        className={`flex flex-col text-lg font-light ${className}`}
        htmlFor={htmlFor}
      >
        {label}
        {children}
      </RadixLabel.Root>
    </>
  );
}
