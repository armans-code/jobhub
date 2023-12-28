import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm',
          className,
        )}
      >
        {icon}
        <input
          type={type}
          className='w-full p-1 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
InputIcon.displayName = 'Input';

export { InputIcon };
