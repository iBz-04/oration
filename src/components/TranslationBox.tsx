import { FC, TextareaHTMLAttributes, useContext } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { TranslationSourceActions } from "./TranslationSourceActions";
import { TranslationTargetActions } from "./TranslationTargetActions";
import { Textarea } from "./ui/textarea";
import { TranslationBoxTypes } from "@/lib/constants";
import { Button } from "./ui/button";
import { textContext } from "@/providers";

interface TranslationBoxProps {
  type: TranslationBoxTypes;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TranslationBox: FC<TranslationBoxProps> = ({
  type,
  textareaProps,
}) => {
  const { handleChangeTextToTranslate } = useContext(textContext);

  const value = textareaProps?.value?.toString().trim() ?? "";

  const handleCleanTextToTranslate = () => {
    handleChangeTextToTranslate("");
  };

  return (
    <div className="flex flex-col gap-2 w-full rounded-lg border border-input hover:border-blue-200 dark:hover:border-blue-800 bg-transparent px-4 py-3 text-sm shadow-sm transition-all duration-200">
      <div className="flex gap-2 flex-1">
        <Textarea 
          className="resize-none min-h-[150px] focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200" 
          {...textareaProps} 
        />

        {TranslationBoxTypes.SOURCE === type && value !== "" && (
          <Button
            onClick={handleCleanTextToTranslate}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
          >
            <Cross1Icon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {TranslationBoxTypes.SOURCE === type && (
        <TranslationSourceActions value={value} />
      )}

      {TranslationBoxTypes.TARGET === type && value !== "" && (
        <TranslationTargetActions value={value} />
      )}
    </div>
  );
};
