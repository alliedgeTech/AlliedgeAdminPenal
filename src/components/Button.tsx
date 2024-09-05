import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ActionButtonProps> = ({ onClick, className, children,type }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} border-1 border-primary text-primary  hover:bg-primary hover:text-white font-extralight`}
      type={type}
    >
      {children}
    </button>
  );
}
interface FormButtonProps {
  className: string;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}
export default Button;

export const FormButton: React.FC<FormButtonProps> = ({ className, children,type }) => {
  return (
    <button
      className={`${className} border-1 border-primary text-primary  hover:bg-primary hover:text-white font-extralight`}
      type={type}
    >
      {children}
    </button>
  );
}

interface CancelButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}

export const CancelButton: React.FC<CancelButtonProps> = ({ onClick, className, children,type }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} border-1 border-gray-400 text-gray-700  hover:bg-gray-300 font-extralight`}
      type={type}
    >
      {children}
    </button>
  );
}

