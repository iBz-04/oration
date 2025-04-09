import { useContext } from "react";
import {
  LanguagePicker,
  ToolBelt,
  TextareaGroup,
  ImageGroup,
  DocumentGroup,
  EyesFollowMouse,
  TranslationContextPicker,
} from "@/components";
import { ToolBeltType } from "@/lib/constants";
import { toolBeltContext } from "@/providers";

export const Translate = () => {
  const { toolBeltType } = useContext(toolBeltContext);

  return (
    <main className="container px-3 mb-10 max-w-[1000px] animate-fade-in opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 mb-6 relative">
        <EyesFollowMouse />
        
        <div className="mb-6">
          <ToolBelt />
        </div>

        <LanguagePicker />
        
        <TranslationContextPicker />

        {toolBeltType === ToolBeltType.TEXT && <TextareaGroup />}

        {toolBeltType === ToolBeltType.IMAGE && <ImageGroup />}

        {toolBeltType === ToolBeltType.DOCUMENT && <DocumentGroup />}
      </div>
    </main>
  );
};
