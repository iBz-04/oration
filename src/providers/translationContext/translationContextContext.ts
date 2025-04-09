"use client";

import { createContext } from "react";

interface TranslationContextContextArgs {
  translationContext: string;
  handleChangeTranslationContext: (translationContext: string) => void;
}

export const translationContextContext = createContext<TranslationContextContextArgs>({
  translationContext: "",
  handleChangeTranslationContext: () => {},
}); 