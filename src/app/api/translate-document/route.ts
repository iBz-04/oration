import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import pdf from "pdf-parse";

import { validPrefixes } from "@/lib/constants";


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


const RequestSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  document: z.string(),
  apiKey: z.string(),
  translationContext: z.string().optional().default("neutral"),
});

export async function POST(req: Request) {
  // Validate the request body
  const body = await req.json();
  const { success: successSchema, data, error } = RequestSchema.safeParse(body);

  if (!successSchema) {
    return Response.json(
      {
        success: false,
        message: "Invalid request body.",
        data: error.format(),
      },
      { status: 400 }
    );
  }

  // Controller for the translation
  const { fromLanguage, toLanguage, document, apiKey, translationContext } = data;

  const matchedPrefix = validPrefixes.find((prefix) =>
    document.startsWith(prefix)
  );
  
  if (!matchedPrefix) {
    return Response.json(
      {
        success: false,
        message: "The Data URI format is invalid",
      },
      { status: 401 }
    );
  }

  const base64Data = document.slice(matchedPrefix.length);

  const pdfBuffer = Buffer.from(base64Data, "base64");

  let textToTranslate = "";

  try {
    const data = await pdf(pdfBuffer);
    textToTranslate = data.text;
  } catch (error) {    
    return Response.json(
      {
        success: false,
        message: "Error parsing the PDF document",
      },
      { status: 500 }
    );
  }

  try {
    const openai = createOpenAI({
      apiKey,
    });

    const model = openai("gpt-4o");

    // Build a context-aware system prompt
    const contextInstructions = getContextInstructions(translationContext);
    
    const systemPrompt = `Translate the following text from ${fromLanguage} to ${toLanguage}.
${contextInstructions}
If "Auto" is the from language, then try to detect the original language automatically after reading the text.
Return directly the translated text. Do not include the prompt in the response.`;

    const result = await streamText({
      model: model as any,
      system: systemPrompt,
      prompt: textToTranslate.toString(),
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "You need to provide your API Key",
      },
      { status: 401 }
    );
  }
}

// Helper function to get context-specific instructions
function getContextInstructions(context: string): string {
  switch (context) {
    case "formal":
      return "Use formal language, appropriate honorifics, and a professional tone. Avoid contractions, slang, or casual expressions. This is for business or official settings.";
    case "casual":
      return "Use everyday conversational language as would be appropriate between friends or peers. Include common idioms and casual expressions where appropriate.";
    case "academic":
      return "Use scholarly language with domain-specific terminology. Maintain precision and formality associated with academic writing.";
    case "literary":
      return "Use expressive, rich language appropriate for creative or literary works. Consider poetic elements and stylistic nuances in the translation.";
    case "neutral":
    default:
      return "Use a balanced, neutral tone appropriate for general contexts.";
  }
}
