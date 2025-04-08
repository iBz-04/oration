"use client";
import { NextPage } from "next";

import { Header, Translate } from "@/containers";
import { useSetSearchParams } from "@/hooks";
import { SetupDialog } from "@/components";

const Features = () => {
  return (
    <section className="container px-3 py-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Text Translation</h3>
          <p className="text-muted-foreground">Instantly translate text between multiple languages with high accuracy using advanced AI models.</p>
        </div>
        
        <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Image Translation</h3>
          <p className="text-muted-foreground">Extract and translate text from images, screenshots, and photos with support for multiple file formats.</p>
        </div>
        
        <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
          <div className="rounded-full bg-green-100 dark:bg-green-900 w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Document Translation</h3>
          <p className="text-muted-foreground">Seamlessly translate PDF documents while preserving formatting, great for contracts, articles, and research papers.</p>
        </div>
      </div>
    </section>
  );
};

const HowToUse = () => {
  return (
    <section className="container px-3 py-10 bg-muted/50 rounded-lg my-10 animate-fade-in opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
      <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
            <span className="font-bold text-blue-600">1</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Select Mode</h3>
          <p className="text-muted-foreground">Choose between text, image, or document translation based on your needs.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
            <span className="font-bold text-blue-600">2</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Choose Languages</h3>
          <p className="text-muted-foreground">Select source and target languages from our comprehensive language list.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
            <span className="font-bold text-blue-600">3</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Input Content</h3>
          <p className="text-muted-foreground">Enter text, upload an image, or drop a PDF document to be translated.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-12 h-12 flex items-center justify-center mb-4">
            <span className="font-bold text-blue-600">4</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Get Translation</h3>
          <p className="text-muted-foreground">Receive accurate translation results powered by advanced language models.</p>
        </div>
      </div>
      
      <div className="mt-10 bg-card border rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Need API Key?</h3>
        <p className="text-muted-foreground text-center mb-4">
          This application uses OpenAI&apos;s powerful models for translation. You&apos;ll need to provide your own API key to use the service.
        </p>
        <div className="flex justify-center">
          <a 
            href="https://platform.openai.com/signup" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          >
            Get OpenAI API Key
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="container py-6 border-t mt-8 text-center text-sm text-muted-foreground animate-fade-in">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <span>© {new Date().getFullYear()} oration</span>
        <span className="hidden md:inline">•</span>
        <span>Powered by Next.js & Tailwind CSS</span>
        <span className="hidden md:inline">•</span>
        <a href="https://github.com/iBz-04/oration" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
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
      <Features />
      <HowToUse />
      <Footer />
      <SetupDialog />
    </>
  );
};

export default HomePage;
