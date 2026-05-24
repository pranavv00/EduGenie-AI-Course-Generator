import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "NEXT_PUBLIC_GEMINI_API_KEY is not set. Please add it to your .env.local file. " +
    "Get your API key from: https://aistudio.google.com/apikey"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const models = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite"
];

const delays = [1000, 2000, 4000, 6000, 8000];

export const GenerateCourseLayout_AI = {
  sendMessage: async (prompt) => {
    let lastError = null;

    for (let i = 0; i < models.length; i++) {
      try {
        console.log(`Attempt ${i + 1}: Using model ${models[i]}`);
        const model = genAI.getGenerativeModel({ model: models[i] });
        
        // Single AI call logic
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig,
        });

        const responseText = result.response.text();
        
        return {
          response: {
            text: () => responseText
          }
        };
      } catch (error) {
        lastError = error;
        const status = error?.status || error?.response?.status;
        
        console.error(`Attempt ${i + 1} failed with status: ${status}`, error);

        // If 429 (quota) or 503 (high demand) or other transient errors
        if (status === 429 || status === 503 || !status) {
          if (i < models.length - 1) {
            console.log(`Retrying in ${delays[i]}ms with next model...`);
            await new Promise(resolve => setTimeout(resolve, delays[i]));
            continue;
          }
        }
        throw error;
      }
    }
    throw lastError || new Error("All retry attempts failed after 5 tries");
  }
};

export const GenerateChapterContent_AI = GenerateCourseLayout_AI;