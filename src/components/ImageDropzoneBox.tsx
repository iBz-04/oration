import { useContext } from "react";
import Image from "next/image";
import { Cross1Icon, ImageIcon } from "@radix-ui/react-icons";

import { Dropzone } from "./Dropzone";
import { imageContext } from "@/providers";
import { Button } from "./ui/button";

export const ImageDropzoneBox = () => {
  const { file, handleImageChange, handleRemoveImage, isLoading } =
    useContext(imageContext);

  const onDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    handleImageChange(file);
  };

  const image = file != null ? URL.createObjectURL(file) : null;

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-2 flex items-center">
        <div className="flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium">Image Translation</span>
        </div>
        
        {file && (
          <span className="ml-auto text-xs text-muted-foreground">
            {file.name} ({(file.size / 1024).toFixed(0)} KB)
          </span>
        )}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center gap-2 w-full relative rounded-lg border border-input hover:border-purple-200 dark:hover:border-purple-800 bg-transparent px-4 py-4 text-sm shadow-sm transition-all duration-200">
        {image ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative group animate-fade-in">
            <Image
              className="max-w-full max-h-[180px] object-contain rounded-md shadow-md group-hover:scale-[0.98] transition-transform duration-200"
              src={image}
              alt="preview image"
              width={300}
              height={300}
            />
            <Button
              className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 shadow-sm transition-colors"
              onClick={handleRemoveImage}
              variant="ghost"
              size="icon"
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
            
            {isLoading && (
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 flex items-center justify-center rounded-md backdrop-blur-sm">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ) : (
          <Dropzone
            title="Drop image here"
            accept={{ "image/*": [] }}
            onDrop={onDrop}
            icon="image"
          />
        )}
      </div>
    </div>
  );
};
