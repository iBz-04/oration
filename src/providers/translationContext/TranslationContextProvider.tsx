"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { translationContextContext } from "./translationContextContext";
import { DEFAULT_TRANSLATION_CONTEXT, SearchParams } from "@/lib/constants";

export const TranslationContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const contextFromQuery = searchParams.get(SearchParams.CONTEXT) ?? DEFAULT_TRANSLATION_CONTEXT;
  const [translationContext, setTranslationContext] = useState(contextFromQuery);

  // Update translation context in URL and state
  const handleChangeTranslationContext = (newContext: string) => {
    setTranslationContext(newContext);

    const newSearchParams = new URLSearchParams(searchParams);

    if (newContext === DEFAULT_TRANSLATION_CONTEXT) {
      newSearchParams.delete(SearchParams.CONTEXT);
    } else {
      newSearchParams.set(SearchParams.CONTEXT, newContext);
    }

    const queryString = newSearchParams.toString();
    router.replace(`${pathname}?${queryString}`);
  };

  // Initialize from URL on mount
  useEffect(() => {
    if (contextFromQuery !== translationContext) {
      setTranslationContext(contextFromQuery);
    }
  }, [contextFromQuery, translationContext]);

  return (
    <translationContextContext.Provider
      value={{
        translationContext,
        handleChangeTranslationContext,
      }}
    >
      {children}
    </translationContextContext.Provider>
  );
}; 