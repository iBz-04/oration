import { Suspense } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ThemeProvider,
  TextProvider,
  LanguageProvider,
  SpeechSynthesisProvider,
  ToolBeltProvider,
  ImageProvider,
  SpeechRecognitionProvider,
  ErrorProvider,
  DocumentProvider,
  TranslationContextProvider,
} from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_TOOLTIP_DELAY_DURATION } from "@/lib/constants";
import { SetupProvider } from "@/providers/setup";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Translate App",
  description:
    "Translate your text, images, and documents in multiple languages",
  keywords:
    "translate, translator, translation, text, image, document, pdf, ai, openai, gpt, chatgpt, vercel, nextjs, tailwindcss, shadcn, radix, react, typescript, bun, pdf-parse",
  metadataBase: new URL("https://talk-translate.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={DEFAULT_TOOLTIP_DELAY_DURATION}>
            <SetupProvider>
              <ErrorProvider>
                <Suspense>
                  <ToolBeltProvider>
                    <LanguageProvider>
                      <TranslationContextProvider>
                        <TextProvider>
                          <ImageProvider>
                            <DocumentProvider>
                              <SpeechSynthesisProvider>
                                <SpeechRecognitionProvider>
                                  {children}
                                  <Analytics />
                                </SpeechRecognitionProvider>
                              </SpeechSynthesisProvider>
                            </DocumentProvider>
                          </ImageProvider>
                        </TextProvider>
                      </TranslationContextProvider>
                    </LanguageProvider>
                  </ToolBeltProvider>
                </Suspense>
              </ErrorProvider>
            </SetupProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
