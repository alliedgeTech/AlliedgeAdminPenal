export interface TabProps {
    label: string;
    index: number;
    isActive: boolean;
    onClick: (index: number) => void;
  }

export interface TabsProps {
    labels: string[];
    children: React.ReactNode;
  }