import React, { FC } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { UploadIcon, ImageIcon, FileIcon } from "@radix-ui/react-icons";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  title: string;
  accept?: Accept;
  icon?: "upload" | "image" | "file";
}

export const Dropzone: FC<DropzoneProps> = ({ 
  title, 
  accept, 
  onDrop, 
  icon = "upload" 
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles: 1,
    onDrop,
  });

  const renderIcon = () => {
    const iconClasses = "h-12 w-12 mb-2";
    
    switch(icon) {
      case "image":
        return <ImageIcon className={`${iconClasses} text-purple-500`} />;
      case "file":
        return <FileIcon className={`${iconClasses} text-green-500`} />;
      default:
        return <UploadIcon className={`${iconClasses} text-blue-500`} />;
    }
  };

  return (
    <div 
      {...getRootProps({
        className: `
          w-full h-full min-h-[180px] flex flex-col items-center justify-center gap-4 cursor-pointer
          rounded-md border-2 border-dashed p-6 transition-all duration-200
          ${isDragActive 
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" 
            : "border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
          }
        `,
      })}
    >
      <input {...getInputProps()} />
      
      <div className={`
        flex flex-col items-center justify-center text-center
        transition-transform duration-200
        ${isDragActive ? "scale-110" : ""}
      `}>
        {renderIcon()}
        
        <p className="text-base">{title}</p>
        
        <p className="text-xs text-muted-foreground mt-2">
          Max file size: 10MB
        </p>
      </div>
    </div>
  );
};
