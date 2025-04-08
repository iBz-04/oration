"use client";
import { NextPage } from "next";

import { Header, Translate } from "@/containers";
import { useSetSearchParams } from "@/hooks";
import { SetupDialog } from "@/components";

const Footer = () => {
  return (
    <footer className="container py-6 border-t mt-8 text-center text-sm text-muted-foreground animate-fade-in">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <span>© {new Date().getFullYear()} TranslateApp</span>
        <span className="hidden md:inline">•</span>
        <span>Powered by Next.js & Tailwind CSS</span>
        <span className="hidden md:inline">•</span>
        <a href="https://github.com/developaul/translate-app" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          View on GitHub
        </a>
      </div>
    </footer>
  );
};

const HomePage: NextPage = () => {
  useSetSearchParams();

  return (
    <>
      <Header />
      <Translate />
      <Footer />
      <SetupDialog />
    </>
  );
};

export default HomePage;
