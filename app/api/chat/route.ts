// app/api/test-gemini/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: "Clé API non trouvée. Vérifiez .env.local" 
      }, { status: 500 });
    }

    // Tester avec une requête simple
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Dis bonjour" }]
          }]
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ 
        error: "Échec de l'API",
        details: data,
        apiKeyLength: apiKey.length
      }, { status: response.status });
    }

    return NextResponse.json({ 
      success: true,
      response: data 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}