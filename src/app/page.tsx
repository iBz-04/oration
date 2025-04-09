"use client";
import { NextPage } from "next";

import { Header, Translate } from "@/containers";
import { useSetSearchParams } from "@/hooks";
import { SetupDialog } from "@/components";

const Features = () => {
  return (
    <section className="container px-3 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Powerful Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Translate anything with advanced AI-powered tools designed for accuracy and ease of use.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Text Translation Card */}
        <div className="group relative overflow-hidden rounded-xl border bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 w-14 h-14 flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Text Translation</h3>
            <p className="text-muted-foreground mb-4 flex-grow">Instantly translate text between multiple languages with high accuracy using advanced AI models.</p>
            <div className="mt-auto">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-1 duration-300">
                Fast and accurate
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        {/* Image Translation Card */}
        <div className="group relative overflow-hidden rounded-xl border bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/30 dark:to-transparent p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-purple-600 w-14 h-14 flex items-center justify-center mb-6 shadow-md shadow-purple-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Image Translation</h3>
            <p className="text-muted-foreground mb-4 flex-grow">Extract and translate text from images, screenshots, and photos with support for multiple file formats.</p>
            <div className="mt-auto">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-1 duration-300">
                Supports screenshots & photos
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        {/* Document Translation Card */}
        <div className="group relative overflow-hidden rounded-xl border bg-gradient-to-b from-green-50/50 to-transparent dark:from-green-950/30 dark:to-transparent p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
              <div className="rounded-full bg-gradient-to-r from-green-500 to-green-600 w-14 h-14 flex items-center justify-center mb-6 shadow-md shadow-green-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Document Translation</h3>
            <p className="text-muted-foreground mb-4 flex-grow">Seamlessly translate PDF documents while preserving formatting, great for contracts, articles, and research papers.</p>
            <div className="mt-auto">
              <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-1 duration-300">
                Preserves formatting
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowToUse = () => {
  return (
    <section className="container px-3 py-16 my-8 animate-fade-in opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Simple steps to get your content translated quickly and accurately.</p>
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {/* Step 1 */}
          <div className="group flex flex-col items-center text-center">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative">
              <span className="font-bold text-xl text-white">1</span>
              <div className="absolute -inset-1 rounded-full bg-blue-400/20 animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Select Mode</h3>
            <p className="text-muted-foreground">Choose between text, image, or document translation based on your needs.</p>
          </div>
          
          {/* Step 2 */}
          <div className="group flex flex-col items-center text-center">
            <div className="rounded-full bg-gradient-to-r from-blue-600 to-purple-500 w-16 h-16 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative">
              <span className="font-bold text-xl text-white">2</span>
              <div className="absolute -inset-1 rounded-full bg-purple-400/20 animate-pulse delay-200"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Choose Languages</h3>
            <p className="text-muted-foreground">Select source and target languages from our comprehensive language list.</p>
          </div>
          
          {/* Step 3 */}
          <div className="group flex flex-col items-center text-center">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative">
              <span className="font-bold text-xl text-white">3</span>
              <div className="absolute -inset-1 rounded-full bg-purple-400/20 animate-pulse delay-300"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Input Content</h3>
            <p className="text-muted-foreground">Enter text, upload an image, or drop a PDF document to be translated.</p>
          </div>
          
          {/* Step 4 */}
          <div className="group flex flex-col items-center text-center">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-500 w-16 h-16 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative">
              <span className="font-bold text-xl text-white">4</span>
              <div className="absolute -inset-1 rounded-full bg-blue-400/20 animate-pulse delay-500"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Translation</h3>
            <p className="text-muted-foreground">Receive accurate translation results powered by advanced language models.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 rounded-xl overflow-hidden border shadow-md bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 max-w-3xl mx-auto">
        <div className="p-8 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200/30 dark:bg-purple-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200/30 dark:bg-blue-500/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Need an API Key?</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
              <div className="max-w-md">
                <p className="text-muted-foreground mb-4">
                  This application uses OpenAI&apos;s powerful models for translation. You&apos;ll need to provide your own API key to use the service.
                </p>
              </div>
              
              <div className="flex justify-center">
                <a 
                  href="https://platform.openai.com/signup" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg text-sm font-medium shadow-md transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:from-blue-700 hover:to-purple-700 h-11 px-6 py-2 group"
                >
                  <span>Get OpenAI API Key</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
