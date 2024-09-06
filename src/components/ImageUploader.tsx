import React, { useState } from 'react';
import ImageImg from '../assets/images/Image';

interface ImageUploaderProps {
  buttonText: string;
  onChange?: (file: any | null) => void;
  withIcon?: boolean;
  withLabel?: boolean;
  className?: string;
  multiple?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  buttonText,
  onChange,
  multiple = false,
  withIcon = true,
  withLabel = true,
  className = '',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);

    if (onChange && event.dataTransfer.files?.length > 0) {
      const uploadedFile = event.dataTransfer.files[0];
      setFile(uploadedFile);
      onChange(uploadedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div className={`image-uploader flex flex-col items-center rounded-lg p-4 ${className}`}>
      {withLabel && <p className="text-gray-500 text-center mb-2">{buttonText}</p>}
      {file ? (
        <div className="flex flex-col items-center">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            className="w-32 h-32 object-cover border-2 border-gray-500"
          />
          <button
            onClick={handleRemove}
            className="mt-2 rounded bg-gray-500 text-white py-1 px-4 hover:bg-gray-600"
          >
            Remove
          </button>
        </div>
      ) : (
        <label
          className={`uploader relative w-80 h-36 flex flex-col items-center justify-center cursor-pointer border border-dashed border-gray-300 rounded-lg hover:border-gray-400 ${dragging ? 'bg-slate-200' : ''}`}
          htmlFor="file-uploader"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drop your image here, or browse</p>
          {withIcon && <ImageImg />}
          <input
            id="file-uploader"
            type="file"
            onChange={onChange}
            className="absolute inset-0 opacity-0 w-full h-full"
            multiple= {multiple}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;
