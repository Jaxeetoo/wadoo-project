import React, { useState } from 'react'

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>{}


const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props}, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
      <div className="flex gap-2 items-center rounded-md bg-transparen shadow-sm border border-zinc-200 focus-visible:outline-none focus-within:ring-1 focus-within:ring-zinc-950 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300">
        <input 
          className="flex h-9 w-full px-3 py-1 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
          type={showPassword ? "text" : "password"} 
          {...props} 
          ref={ref} 
          />
          {          
            showPassword ? 
              <EyeOpenIcon  className={`mx-2 size-sm select-none `} onClick={() => setShowPassword(false)} /> 
              : 
              <EyeClosedIcon  className={`mx-2 size-sm select-none `} onClick={() => setShowPassword(true)} />
          }
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }