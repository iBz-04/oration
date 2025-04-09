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
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 animate-fade-in">
      <div className="flex-1 transition-all duration-300 rounded-lg pb-4 md:pb-0 group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        <TranslationBox
          textareaProps={{
            readOnly: isRecording,
            placeholder: isRecording ? "Speak now..." : "Enter text to translate...",
            value: textToTranslate,
            onChange: _handleChangeTextToTranslate,
          }}
          type={TranslationBoxTypes.SOURCE}
        />
      </div>

      <div className="hidden md:flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md text-white">
          <svg width="18" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3L14 8L8 13M2 8H14H2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 transition-all duration-300 rounded-lg group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        <TranslationBox
          textareaProps={{
            readOnly: true,
            placeholder: "Translation will appear here...",
            value: completion,
          }}
          type={TranslationBoxTypes.TARGET}
        />
        
        {!completion && textToTranslate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};
