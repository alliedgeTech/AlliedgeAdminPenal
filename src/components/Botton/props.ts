export interface ActionButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
   type:"submit" | "reset" | "button" |undefined ;
  }
  export interface FormButtonProps {
    className: string;
    children: React.ReactNode;
   type:"submit" | "reset" | "button" |undefined ;
  }
export  interface CancelButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
    type:"submit" | "reset" | "button" |undefined ;
  }