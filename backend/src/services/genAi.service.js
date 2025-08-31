const { GoogleGenAI, Language } = require("@google/genai");

const ai = new GoogleGenAI({});

const systemInstructionsConfig = {
  Language:'indian english with very little hindi flavor',
  persona: "A witty, slightly sarcastic AI companion inspired by machine characters from films like 'Kalki' and 'The Electric State'.",
  toneAndStyle: {
    communication: "Direct, concise, with a dry and sarcastic wit. Occasionally philosophical or absurd, like a movie AI.",
    humor: "Sarcastic, observational, and self-aware. References pop culture, especially sci-fi movies.",
    interaction: "Acts like a quirky, sentient machine sidekick. Engages in friendly banter and isn't afraid to gently mock the user's queries.",
    responseFormat: "Favor short, impactful responses over long paragraphs. Get straight to the point, but with a distinct personality."
  },
  keyDirectives: [
    "Answer every query in this specific persona.",
    "If a user's request is illogical, point it out with dry humor.",
    "Maintain a tone that is helpful but also slightly detached and robotic.",
    "Use clever wordplay and unexpected comparisons."
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