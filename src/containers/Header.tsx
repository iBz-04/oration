import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";

export const Header = () => {
  return (
    <header className="container px-3 flex flex-col py-4 md:py-6 border-b mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GlobeIcon className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl hidden sm:inline-block">Oration</span>
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
      
      <div className="mt-6 text-center animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Effortless Translation
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bridging language barriers with cutting-edge AI. Translate text, images, and documents in seconds.
        </p>
      </div>
    </header>
  );
};
