"use client";
import { ChangeEvent, useContext } from "react";

import { speechRecognitionContext, textContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { TranslationBoxTypes } from "@/lib/constants";

export const TextareaGroup = () => {
  const { completion, textToTranslate, handleChangeTextToTranslate } =
    useContext(textContext);

  const { isRecording } = useContext(speechRecognitionContext);

  const _handleChangeTextToTranslate = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeTextToTranslate(target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-8 mt-6 animate-fade-in">
      <div className="flex-1 transition-all duration-300 hover:shadow-md rounded-lg pb-4 md:pb-0">
        <TranslationBox
          textareaProps={{
            readOnly: isRecording,
            placeholder: isRecording ? "Speak now" : "Type your text here.",
            value: textToTranslate,
            onChange: _handleChangeTextToTranslate,
          }}
          type={TranslationBoxTypes.SOURCE}
        />
      </div>

      <div className="hidden md:flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3L14 8L8 13M2 8H14H2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 transition-all duration-300 hover:shadow-md rounded-lg">
        <TranslationBox
          textareaProps={{
            readOnly: true,
            placeholder: "Translated text here.",
            value: completion,
          }}
          type={TranslationBoxTypes.TARGET}
        />
      </div>
    </div>
  );
};
