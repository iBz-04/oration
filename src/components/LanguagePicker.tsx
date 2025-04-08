"use client";
import { useContext } from "react";
import { WidthIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox";
import { ToolBeltType, languages } from "@/lib/constants";
import {
  languageContext,
  speechSynthesisContext,
  textContext,
  toolBeltContext,
} from "@/providers";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const LanguagePicker = () => {
  const {
    fromLanguage,
    toLanguage,
    handleChangeToLanguage,
    handleChangeFromLanguage,
    handleSwitchLanguage,
  } = useContext(languageContext);

  const { handleSetTextToTranslate, completion } = useContext(textContext);

  const { toolBeltType } = useContext(toolBeltContext);

  const { handleStopSpeaking } = useContext(speechSynthesisContext);

  const _handleSwitchLanguage = () => {
    handleSwitchLanguage(completion);
    handleStopSpeaking();

    if (toolBeltType === ToolBeltType.TEXT)
      handleSetTextToTranslate(completion);
  };

  const _handleChangeFromLanguage = (fromLanguage: string) => {
    handleChangeFromLanguage(fromLanguage);
    handleStopSpeaking();
  };

  const _handleChangeToLanguage = (toLanguage: string) => {
    handleChangeToLanguage(toLanguage);
    handleStopSpeaking();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-slide-up bg-muted/30 p-4 rounded-lg">
      <div className="flex-1 min-w-[180px] max-w-[300px]">
        <label className="block text-sm font-medium mb-1 text-muted-foreground">Translate from:</label>
        <Combobox
          options={languages}
          value={fromLanguage}
          onChange={_handleChangeFromLanguage}
          className="w-full"
        />
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={_handleSwitchLanguage} 
            variant="secondary" 
            size="icon"
            className="rounded-full h-10 w-10 flex items-center justify-center transition-transform hover:rotate-180 duration-300 shadow-sm animate-pulse-blue"
          >
            <WidthIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Exchange languages</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex-1 min-w-[180px] max-w-[300px]">
        <label className="block text-sm font-medium mb-1 text-muted-foreground">Translate to:</label>
        <Combobox
          options={languages}
          value={toLanguage}
          onChange={_handleChangeToLanguage}
          className="w-full"
        />
      </div>
    </div>
  );
};
