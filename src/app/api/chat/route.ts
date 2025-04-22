
import { NextRequest, NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Part, 
} from '@google/generative-ai';

interface ChatMessage {
  role: 'user' | 'model';
  parts: Part[];
}


const apiKey = process.env.GEMINI_API_KEY;


const modelName = "gemini-1.5-flash-latest"; 

// --- Safety Settings ---
// Configure safety settings to block harmful content. Adjust thresholds as needed.
const safetySettings = [
   {
     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
   },
   {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
   },
   {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
   },
   {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];


if (!apiKey) {
  console.error("FATAL ERROR: GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export async function POST(req: NextRequest) {
  if (!apiKey) {
    console.error('Gemini API error: API key not configured');
    return NextResponse.json(
      { error: 'API key not configured on the server.' },
      { status: 500 } 
    );
  }

  try {
    // --- Parse Request Body ---
    const { messages, systemPrompt } = (await req.json()) as {
      messages: ChatMessage[];
      systemPrompt?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request body: messages array is required and cannot be empty.' },
        { status: 400 } 
      );
    }

    // Separate history and the latest message
    const historyMessages = messages.slice(0, -1);
    const latestUserMessage = messages[messages.length - 1];

    // --- History Validation ---
    // 1. If history exists, the first message MUST be from the 'user'
    if (historyMessages.length > 0 && historyMessages[0].role !== 'user') {
      console.error("Invalid history provided: First message role is not 'user'. History:", historyMessages);
      return NextResponse.json(
        { error: "Invalid chat history format: History must start with a 'user' role." },
        { status: 400 } // Bad Request
      );
    }

    // 2. Roles must strictly alternate (user, model, user, model...)
    for (let i = 0; i < historyMessages.length - 1; i++) {
      if (historyMessages[i].role === historyMessages[i + 1].role) {
        console.error("Invalid history provided: Consecutive messages have the same role.", historyMessages);
        return NextResponse.json(
          { error: "Invalid chat history format: Roles must alternate between 'user' and 'model'." },
          { status: 400 } 
        );
      }
    }

    // --- Latest Message Validation ---
    // The last message sent MUST be from the 'user'
    if (!latestUserMessage || latestUserMessage.role !== 'user') {
       console.error("Invalid latest message: Must be from 'user'.", latestUserMessage);
       return NextResponse.json(
         { error: 'Invalid format: The last message must be from the user.' },
         { status: 400 } 
       );
    }
    // Ensure the latest message has text content to send
    const latestUserMessageContent = latestUserMessage.parts?.[0]?.text;
    if (typeof latestUserMessageContent !== 'string') {
         console.error("Invalid latest message: Missing text content.", latestUserMessage);
         return NextResponse.json(
           { error: 'Invalid format: The latest user message must have text content.' },
           { status: 400 } 
         );
    }

    // --- Initialize Model and Chat ---
    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings: safetySettings,
      ...(systemPrompt && { systemInstruction: { role: "system", parts: [{ text: systemPrompt }] } }), 
    });

    const chat = model.startChat({
      history: historyMessages.map(msg => ({
        role: msg.role,
        parts: msg.parts, 
      })),
      generationConfig: {
        maxOutputTokens: 500, 
        temperature: 0.7,   
      },
    });

    const result = await chat.sendMessage(latestUserMessageContent);

    const response = result.response;
    const responseText = response.text(); 

    return NextResponse.json({
      message: responseText
    });

  } catch (error: any) {
    console.error('Gemini API error:', error); 

    let errorMessage = 'Failed to process your request due to an internal server error.';
    if (error.message) {
      errorMessage = `Failed to process request: ${error.message}`;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}