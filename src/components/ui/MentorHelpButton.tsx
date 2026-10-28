import React from 'react';
import { UsersIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './Button';
import type { ButtonSize } from '../../utils/buttonClasses';

interface MentorHelpButtonProps {
  size?: ButtonSize;
  className?: string;
}

export function MentorHelpButton({ size = 'md', className }: MentorHelpButtonProps) {
  return (
    <Button
      variant="secondary"
      size={size}
      className={className}
      onClick={() =>
      toast.success('Mentor request sent', {
        description: 'A mentor will reply in Mentorship within a few minutes.'
      })
      }>
      
      <UsersIcon className="h-4 w-4" />
      Get mentor help
    </Button>);

}