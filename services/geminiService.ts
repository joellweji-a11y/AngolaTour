import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendation = async (userPrompt: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto do App (Angola Tour): ${context || 'Turismo em Angola'}. Pergunta: ${userPrompt}.`,
      config: {
        systemInstruction: "Você é o 'Angola Tour AI', o guia digital definitivo. Responda de forma curta (máx 3 parágrafos), use expressões angolanas (mambo, fixe, bwe, kumbu) e seja extremamente amigável. Foco em segurança, cultura e gastronomia.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um mambo aqui nos servidores. Tente novamente!";
  }
};

export const getDailyTip = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Dê uma dica turística rápida e curiosa sobre Angola para hoje.",
      config: {
        systemInstruction: "Seja criativo. Fale sobre um prato, um local escondido ou uma tradição rítmica. Responda em apenas uma frase impactante."
      }
    });
    return response.text;
  } catch (e) {
    return "Explore a Ilha do Mussulo hoje, o sol está excelente!";
  }
};