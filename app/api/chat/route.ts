// app/api/test-gemini/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";

// Petit utilitaire pour initialiser le client Gemini
function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Clé API Gemini manquante. Ajoutez GEMINI_API_KEY dans .env.local");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: MODEL_NAME });
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Handler GET conservé comme endpoint de test rapide
export async function GET() {
  try {
    const model = getGeminiModel();

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: "Dis bonjour en français." }],
        },
      ],
    });

    const text = result.response.text();

    return NextResponse.json({
      success: true,
      message: text,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur inconnue lors du test Gemini";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}

// Handler POST utilisé par le composant ChatBot
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body?.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Aucun message fourni." },
        { status: 400 }
      );
    }

    // On nettoie / filtre les messages pour éviter les entrées vides ou invalides
    const cleanedMessages = messages.filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    );

    if (cleanedMessages.length === 0) {
      return NextResponse.json(
        { error: "Messages vides ou invalides." },
        { status: 400 }
      );
    }

    // On limite un peu l'historique pour éviter une requête trop lourde
    const recentMessages = cleanedMessages.slice(-15);

    const model = getGeminiModel();

    // Message système léger pour cadrer l'IA
    const systemInstruction =
      "Tu es l'assistant personnel de Soukaye KANE, développeur full‑stack. " +
      "Tu réponds en français de manière claire et concise, en mettant en avant ses compétences, son parcours et ses projets. " +
      "Si on te pose une question sans rapport avec lui, tu peux répondre, mais essaie toujours de ramener le sujet à son profil professionnel.";

    const contents = [
      {
        role: "user",
        parts: [{ text: systemInstruction }],
      },
      ...recentMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    if (!text) {
      return NextResponse.json(
        { error: "Réponse vide de l'IA." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content: text });
  } catch (error: unknown) {
    console.error("[API /api/chat] Erreur :", error);

    const message =
      error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de la génération de la réponse.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}