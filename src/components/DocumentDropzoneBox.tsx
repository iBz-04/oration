import { useContext } from "react";
import { Cross1Icon, FileIcon } from "@radix-ui/react-icons";

import { documentContext } from "@/providers";
import { formatBytes } from "@/lib/utils";
import { Dropzone } from "./Dropzone";
import { Button } from "./ui/button";

export const DocumentDropzoneBox = () => {
  const { file, handleChangeFile, handleRemoveFile, isLoading } =
    useContext(documentContext);

  const onDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    handleChangeFile(file);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-2 flex items-center">
        <div className="flex items-center gap-1.5">
          <FileIcon className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Document Translation</span>
        </div>
        
        {file && (
          <span className="ml-auto text-xs text-muted-foreground">
            {file.name} ({formatBytes(file.size)})
          </span>
        )}
      </div>
      
      <div className="min-h-[200px] flex items-center justify-center gap-2 w-full relative rounded-lg border border-input hover:border-green-200 dark:hover:border-green-800 bg-transparent px-4 py-4 text-sm shadow-sm transition-all duration-200">
        {file ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative group animate-fade-in">
            <div className="flex flex-col items-center justify-center p-6 rounded-md bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 shadow-md group-hover:scale-[0.98] transition-transform duration-200 w-full max-w-sm">
              <FileIcon className="h-12 w-12 mb-4 text-green-500" />
              
              <div className="text-center">
                <p className="font-medium mb-1 truncate max-w-[250px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
            </div>
            
            <Button
              className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 shadow-sm transition-colors"
              onClick={handleRemoveFile}
              variant="ghost"
              size="icon"
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
            
            {isLoading && (
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 flex items-center justify-center rounded-md backdrop-blur-sm">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ) : (
          <Dropzone
            title="Drop pdf here"
            accept={{ "application/pdf": [] }}
            onDrop={onDrop}
            icon="file"
          />
        )}
      </div>
    </div>
  );
};
