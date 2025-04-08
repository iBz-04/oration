import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";

export const Header = () => {
  return (
    <header className="container px-3 flex items-center justify-between py-4 md:py-6 border-b mb-6">
      <div className="flex items-center gap-2">
        <GlobeIcon className="h-6 w-6 text-blue-600" />
        <span className="font-bold text-xl hidden sm:inline-block">TranslateApp</span>
      </div>
      
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/developaul/translate-app"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <GitHubLogoIcon className="h-5 w-5" />
          </Button>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
};
