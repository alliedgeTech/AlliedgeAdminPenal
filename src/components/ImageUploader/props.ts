export interface ImageUploaderProps {
    buttonText: string;
    onChange?: (file: any | null) => void;
    imgExtension?: string[];
    withIcon?: boolean;
    withLabel?: boolean;
    className?: string;
  }
  