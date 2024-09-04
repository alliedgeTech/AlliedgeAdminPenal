export interface Option {
    id: string;
    [key: string]: any;
  }
  
export  interface CustomDropdownProps {
    label: string;
    options: Option[];
    defaultOptionId: string;
    setDefaultOptionId: (id: string) => void;
    displayProperty: string;
    value: string;
  }