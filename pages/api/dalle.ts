//pages\api\dalle.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
 
type DalleApiResponse = OpenAI.ImagesResponse | { error: string };

async function dalleRequest(prompt: string , model: string): Promise<OpenAI.ImagesResponse> {
  try {
    return await openai.images.generate({
      model: model,
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url"
    });
  } catch (error) {
    console.error("Error creating image with DALL-E:", error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DalleApiResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    console.log(req.body)
    const { prompt, model } = req.body;

    
    if (!prompt) {
      res.status(400).json({ error: 'No prompt provided' });
      return;
    }

    const imageResponse = await dalleRequest(prompt, model);
    console.log(imageResponse)
    res.status(200).json(imageResponse);
  } catch (error) {
    console.error("Error in DALL-E request:", error);

    // Handling specific error scenarios
    if (error instanceof Error) {
      // Known error (e.g., application-level, API error with specific message)
      res.status(500).json({ error: `Failed to create image: ${error.message}` });
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
      // Handling HTTP response errors from OpenAI
      const apiError = error as { response: { status: number; data: any } };
      console.error("OpenAI API Error:", apiError.response);
      res.status(apiError.response.status).json({ error: apiError.response.data });
    } else {
      // Unknown error
      res.status(500).json({ error: 'Failed to create image due to unknown error' });
    }
  }
}
