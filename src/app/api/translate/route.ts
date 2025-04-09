import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  prompt: z.string(),
  fromLanguage: z.string(),
  toLanguage: z.string(),
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
  const { fromLanguage, toLanguage, prompt, apiKey, translationContext } = data;

  const openai = createOpenAI({
    compatibility: "strict",
    apiKey,
  });

  const model = openai("gpt-4o");

  try {
    // Build a context-aware system prompt
    const contextInstructions = getContextInstructions(translationContext);
    
    const systemPrompt = `Translate the following text from ${fromLanguage} to ${toLanguage}. 
${contextInstructions}
If "Auto" is the from language, then try to detect the original language automatically after reading the text.
Return directly the translated text. Do not include the prompt in the response.`;

    const result = await streamText({
      model,
      prompt,
      system: systemPrompt,
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
