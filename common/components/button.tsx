import * as React from 'react';

type Variant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'loading'
  | '';

type ButtonProps = {
  type?: 'submit' | 'button';
  onClick?: () => void;
  label: string;
  isActive?: boolean;
  isOutline?: boolean;
  variant?: Variant;
};

export default function Button({
  type = 'submit',
  onClick,
  isActive = true,
  isOutline = false,
  label,
  variant = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn w-full ${isActive ? 'btn-active' : ''} ${
        isOutline ? 'btn-outline hover:bg-inherit hover:text-inherit' : ''
      } ${variant === 'loading' ? '' : 'btn-'}${variant}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
}
