import { Label as RadixLabel } from 'radix-ui';

interface ILabel {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
}

export default function Label({ label, children, htmlFor }: ILabel) {
  return (
    <>
      <RadixLabel.Root
        className="flex flex-col text-lg font-light"
        htmlFor={htmlFor}
      >
        {label}
        {children}
      </RadixLabel.Root>
    </>
  );
}
