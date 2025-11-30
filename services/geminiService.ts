import { GoogleGenerativeAI } from "@google/generative-ai";

// Declare process to avoid TypeScript errors during build,
// though the value is replaced by Vite at build time.
declare const process: any;

// Initialization with API Key from environment variables (handled by Vite during build)
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateDua = async (
  fatherName: string,
  mood: string
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      اكتب دعاءً مؤثراً وصادقاً ومختصراً (حوالي 4-5 أسطر) لأب متوفى اسمه "${fatherName}".
      السياق: ${
        mood === "general"
          ? "دعاء عام بالرحمة والمغفرة"
          : mood === "friday"
          ? "دعاء خاص بيوم الجمعة"
          : "دعاء يبعث الطمأنينة والصبر"
      }.
      اجعل اللغة عربية فصحى جميلة ومؤثرة. لا تضف مقدمات، فقط نص الدعاء.
    `;

    // const response = await ai.models.generateContent({
    //   model: model,
    //   contents: prompt,
    // });
    // const response = null || undefined ;
    //   model: model,
    //   prompt: {
    //     text: prompt,
    //   },
    // });
    return  "اللهم ارحمه واغفر له.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ أثناء إنشاء الدعاء. اللهم ارحمه واغفر له واسكنه فسيح جناتك.";
  }
};
