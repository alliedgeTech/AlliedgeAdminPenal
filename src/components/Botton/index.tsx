import React from 'react';
import { ActionButtonProps, CancelButtonProps, FormButtonProps } from './props';



const Button: React.FC<ActionButtonProps> = ({ onClick, className, children,type }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} border-2 border-fontColor text-fontColor  hover:bg-fontColor hover:text-white font-medium`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;

export const FormButton: React.FC<FormButtonProps> = ({ className, children,type }) => {
  return (
    <button
      className={`${className} border border-fontColLit8 text-fontColLit3  hover:bg-fontColLit9 hover:text-white font-medium`}
      type={type}
    >
      {children}
    </button>
  );
}


export const CancelButton: React.FC<CancelButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} border border-gray-400 text-gray-700  hover:bg-gray-500 hover:text-white font-medium`}
    >
      {children}
    </button>
  );
}

