"use client";

import { useContext } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { translationContextContext } from "@/providers";
import { translationContexts } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { DEFAULT_TOOLTIP_DELAY_DURATION } from "@/lib/constants";

export const TranslationContextPicker = () => {
  const { translationContext, handleChangeTranslationContext } = useContext(
    translationContextContext
  );

  // Find the current context object
  const currentContext = translationContexts.find(
    (ctx) => ctx.value === translationContext
  ) || translationContexts[0];

  return (
    <div className="bg-muted/30 p-4 rounded-lg mb-6 animate-slide-up">
      <div className="flex items-center mb-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
          Translation tone
          <Tooltip delayDuration={DEFAULT_TOOLTIP_DELAY_DURATION}>
            <TooltipTrigger asChild>
              <InfoCircledIcon className="h-4 w-4 opacity-70 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Select the tone or context for the translation to improve accuracy and appropriateness.
            </TooltipContent>
          </Tooltip>
        </label>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {translationContexts.map((ctx) => (
          <Button
            key={ctx.value}
            variant={ctx.value === translationContext ? "secondary" : "outline"}
            size="sm"
            className={`
              relative px-3 py-2 transition-all
              ${ctx.value === translationContext ? 'shadow-sm' : 'opacity-80 hover:opacity-100'}
            `}
            onClick={() => handleChangeTranslationContext(ctx.value)}
          >
            {ctx.label}
          </Button>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {currentContext.description}
      </p>
    </div>
  );
}; 