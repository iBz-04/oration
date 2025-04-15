import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="container px-3 flex flex-col py-4 md:py-6 border-b mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image 
              src="/logo.png" 
              alt="Oration Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">ORATION</span>
        </div>
        
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/iBz-04/oration"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" className="rounded-full">
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
          </a>
          <ThemeToggle />
        </div>
      </div>
      
      {/* <div className="mt-6 text-center animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Effortless Translation
        </h1> 
         <p className="text-muted-foreground max-w-2xl mx-auto">
          Bridging language barriers with cutting-edge AI. Translate text, images, and documents in seconds.
        </p>
      </div> */}
    </header>
  );
};
