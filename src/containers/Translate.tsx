import { useContext } from "react";
import {
  LanguagePicker,
  ToolBelt,
  TextareaGroup,
  ImageGroup,
  DocumentGroup,
} from "@/components";
import { ToolBeltType } from "@/lib/constants";
import { toolBeltContext } from "@/providers";

export const Translate = () => {
  const { toolBeltType } = useContext(toolBeltContext);

  return (
    <main className="container px-3 mb-10 max-w-[1000px]">
      <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Translation Hub</h1>
        <p className="text-muted-foreground text-center mb-6">Translate text, images, and documents across multiple languages</p>
        <ToolBelt />

        <LanguagePicker />

        {toolBeltType === ToolBeltType.TEXT && <TextareaGroup />}

        {toolBeltType === ToolBeltType.IMAGE && <ImageGroup />}

        {toolBeltType === ToolBeltType.DOCUMENT && <DocumentGroup />}
      </div>
    </main>
  );
};
