import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai.responses("gpt-4o-mini"),
    tools: {
      web_search_preview: openai.tools.webSearchPreview({}),
    },
    messages,
    temperature: 0,
  });

  return result.toDataStreamResponse();
}
