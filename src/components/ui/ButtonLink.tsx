import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { buttonClasses, ButtonSize, ButtonVariant } from '../../utils/buttonClasses';

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, typeof className === 'string' ? className : undefined)} {...props} />;
}