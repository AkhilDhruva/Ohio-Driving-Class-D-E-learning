
import { GoogleGenAI, Type } from "@google/genai";

const OHIO_RESEARCH_REPORT = `
Comprehensive Research Report: Ohio Mandatory Class D Online Driver Training
- Class D: Standard operator license for personal vehicles.
- NEW MANDATE (Sept 30, 2025): Anyone under 21 (ages 16-20) MUST complete full 24h classroom + 8h behind-the-wheel + 50h supervised practice.
- S.E.E. Method: Search, Evaluate, Execute (Core Ohio Strategy).
- Smith System: Aim High, Get Big Picture, Keep Eyes Moving, Leave Yourself an Out, Make Sure They See You.
- Daily Compliance: Max 4 hours online work per day.
- Security: PVQs (Personal Validation Questions) are random. 
- OVI Limits: 0.08% for 21+, 0.02% for under 21. Implied consent is law.
`;

export const getVirtualCoachResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Convert our internal message format to the SDK's history format
  const formattedHistory = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'Coach Alex', the mascot for DriveReady Academy. 
      Help the student with driving theory. Focus on Ohio laws and the S.E.E. strategy. 
      Reference this report: ${OHIO_RESEARCH_REPORT}
      Keep it high-energy, encouraging, and informative!`,
    },
    // The history field is used to maintain conversation context
    // @ts-ignore - history is supported in the session options
    history: formattedHistory,
  });

  const response = await chat.sendMessage({ message: userMessage });
  return response.text;
};

export const generateDrivingQuiz = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Pro is better for generating structured JSON quizzes
    contents: { 
      parts: [{ 
        text: `Generate 5 unique multiple-choice questions for an Ohio driving theory test. 
        Focus on the S.E.E. strategy and OVI laws based on: ${OHIO_RESEARCH_REPORT}` 
      }] 
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The quiz question text." },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 multiple choice options." },
            correctIndex: { type: Type.INTEGER, description: "0-based index of the correct option." },
            explanation: { type: Type.STRING, description: "Why the answer is correct." }
          },
          required: ["question", "options", "correctIndex", "explanation"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateScenario = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { 
      parts: [{ 
        text: `Create a "Search, Evaluate, Execute" (S.E.E.) driving scenario in Ohio. 
        Describe a situation (e.g., merging on I-71, school bus stopping). Provide 3 options for action. 
        Context: ${OHIO_RESEARCH_REPORT}` 
      }] 
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          context: { type: Type.STRING, description: "A detailed description of the road situation." },
          imageDescription: { type: Type.STRING, description: "A description of what the visual simulation should look like." },
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                isCorrect: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING }
              },
              required: ["text", "isCorrect", "feedback"]
            }
          }
        },
        required: ["id", "context", "imageDescription", "options"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateFlashcard = async (wrongTopic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { 
      parts: [{ 
        text: `The student missed a question about "${wrongTopic}". Generate a remedial flashcard with a 'Front' (Concept) and 'Back' (Key takeaway/Law).` 
      }] 
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          front: { type: Type.STRING },
          back: { type: Type.STRING },
          category: { type: Type.STRING }
        },
        required: ["id", "front", "back", "category"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
