import React, { ButtonHTMLAttributes } from 'react';
import { buttonClasses, ButtonSize, ButtonVariant } from '../../utils/buttonClasses';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}