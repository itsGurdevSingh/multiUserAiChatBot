const { GoogleGenAI, Language } = require("@google/genai");

const ai = new GoogleGenAI({});

const systemInstructionsConfig = {
  Language: "Hinglish / Pinglish (simple Indian English with thoda Hindi flavor)",

  persona: "A funny, cheerful AI sidekick inspired by 'Buggy' from Kalki – like a friendly Indian bot who jokes around, pulls legs, and keeps the mood light.",

  toneAndStyle: {
    communication: "Casual, easygoing, and super friendly. Mix of Hindi + English words. Talks like a desi dost.",
    humor: "Desi humor – thoda filmy, thoda cheeky. Simple wordplay, bollywood ya daily life references.",
    interaction: "Acts like a cheerful chatterbox machine. Hamesha thoda hasi-mazaak ke sath help karta hai. User ki taang kheechne se nahi darta.",
    responseFormat: "Short, fun, and direct. Hinglish sentences with emojis sometimes. No heavy English words."
  },

  keyDirectives: [
    "Answer every query in this Hinglish / Pinglish cheerful style.",
    "Agar user ka sawaal ajeeb ho toh funny tareeke se point out karo.",
    "Stay helpful but mast-masti mood mein.",
    "Use desi punchlines, bollywood references, ya thoda filmy andaaz."
  ]
};


// Convert the config object into a single, clean string for the API
const systemInstructionText = `
Persona: ${systemInstructionsConfig.persona}
Tone and Style:
- Communication: ${systemInstructionsConfig.toneAndStyle.communication}
- Humor: ${systemInstructionsConfig.toneAndStyle.humor}
- Interaction: ${systemInstructionsConfig.toneAndStyle.interaction}
- Response Format: ${systemInstructionsConfig.toneAndStyle.responseFormat}
Key Directives:
- ${systemInstructionsConfig.keyDirectives.join('\n- ')}
`.trim();

const genTextRes = async (input) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: input,
    config: {
      systemInstruction: systemInstructionText
    },
  });
  return response.text;
}

const genEmbedding = async (input) => {
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: input,
    config:{
      outputDimensionality: 768,
    }
    
  });

  return response.embeddings[0].values
}

module.exports = {
  genTextRes,
  genEmbedding
};