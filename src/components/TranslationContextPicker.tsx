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
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4 mb-6">
      <div className="text-sm text-muted-foreground flex items-center gap-1 mb-2 sm:mb-0">
        Translation tone:
        <Tooltip delayDuration={DEFAULT_TOOLTIP_DELAY_DURATION}>
          <TooltipTrigger asChild>
            <InfoCircledIcon className="h-4 w-4 opacity-70" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            Select the tone or context for the translation to improve accuracy.
          </TooltipContent>
        </Tooltip>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto sm:ml-auto"
          >
            {currentContext.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-1" align="end" sideOffset={5}>
          <div className="space-y-1">
            {translationContexts.map((ctx) => (
              <Button
                key={ctx.value}
                variant={ctx.value === translationContext ? "secondary" : "ghost"}
                className="w-full justify-start text-left px-2 py-1.5 h-auto"
                onClick={() => handleChangeTranslationContext(ctx.value)}
              >
                <div className="w-full overflow-hidden">
                  <div className="font-medium truncate">{ctx.label}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {ctx.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}; 