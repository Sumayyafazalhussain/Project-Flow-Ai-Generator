import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateFlow(userText) {
  const prompt = `
You are a flowchart generator for websites and applications.
The user will describe a website or application structure.
Return ONLY a valid JSON object with "nodes" and "edges" for React Flow.

Create nodes for each major page/component.
Connect them with edges showing the flow.

Rules:
- Each node should have a unique id (use numbers: "1", "2", "3"...)
- Each node should have a label showing the page/component name
- Position nodes in a logical flow (left to right or top to bottom)
- x coordinates: 0, 250, 500, 750
- y coordinates: 0, 100, 200, 300

Example format:
{
  "nodes": [
    {"id": "1", "data": {"label": "Homepage"}, "position": {"x": 0, "y": 0}},
    {"id": "2", "data": {"label": "Products"}, "position": {"x": 250, "y": 0}}
  ],
  "edges": [
    {"id": "e1-2", "source": "1", "target": "2"}
  ]
}

User description: ${userText}

Return only the JSON object, no other text.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { nodes: [], edges: [] };
  } catch (error) {
    console.error("Error generating flowchart:", error);
    return { nodes: [], edges: [] };
  }
}