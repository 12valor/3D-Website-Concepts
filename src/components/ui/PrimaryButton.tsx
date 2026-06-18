import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showIcon?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, showIcon = false, className = '', ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#d97706] hover:bg-[#b96305] text-white font-semibold px-7 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-95 ${className}`}
      {...props}
    >
      {children}
      {showIcon && <ArrowUpRight className="w-5 h-5" />}
    </button>
  );
};
