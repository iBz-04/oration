"use client";
import { ChangeEvent, useContext, useState, useEffect } from "react";

import { languageContext, speechRecognitionContext, textContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { TranslationBoxTypes } from "@/lib/constants";
import { detectLanguage } from "@/lib/utils";

export const TextareaGroup = () => {
  const { completion, textToTranslate, handleChangeTextToTranslate } =
    useContext(textContext);

  const { isRecording } = useContext(speechRecognitionContext);
  const { fromLanguage, toLanguage, handleChangeFromLanguage, handleChangeToLanguage } = useContext(languageContext);
  
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [showDetectedLanguage, setShowDetectedLanguage] = useState(false);

  const _handleChangeTextToTranslate = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeTextToTranslate(target.value);
  };
  
  useEffect(() => {
    if (textToTranslate && textToTranslate.length > 15) {
      const timer = setTimeout(() => {
        const detected = detectLanguage(textToTranslate);
        if (detected && detected !== fromLanguage) {
          setDetectedLanguage(detected);
          setShowDetectedLanguage(true);
        } else {
          setShowDetectedLanguage(false);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setShowDetectedLanguage(false);
    }
  }, [textToTranslate, fromLanguage]);
  
  const handleSetDetectedLanguage = () => {
    if (detectedLanguage) {
      handleChangeFromLanguage(detectedLanguage);
      
      // Always set "translate to" language to English when a new language is detected
      if (toLanguage !== "English") {
        handleChangeToLanguage("English");
      }
      
      setShowDetectedLanguage(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 animate-fade-in">
      <div className="flex-1 transition-all duration-300 rounded-lg pb-4 md:pb-0 group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        
        {showDetectedLanguage && (
          <div className="absolute top-0 right-0 m-2 z-10 bg-blue-50 dark:bg-blue-900/60 p-3 rounded-lg shadow-md backdrop-blur-sm border border-blue-200 dark:border-blue-800 text-sm animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">Language detected:</span>
            </div>
            <p className="mb-3 text-blue-800 dark:text-blue-300 font-semibold text-center">
              {detectedLanguage}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={handleSetDetectedLanguage}
                className="flex-1 text-xs px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Use this language
              </button>
              <button 
                onClick={() => setShowDetectedLanguage(false)}
                className="text-xs px-2 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        
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
