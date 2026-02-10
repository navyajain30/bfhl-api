
import fetch from 'node-fetch';

export const callGemini = async (prompt) => {
    const GEMINI_API_KEY = process.env.GEMINI_KEY;
    if (!GEMINI_API_KEY) {
        console.error("Gemini API Key missing");
        return "API_KEY_MISSING";
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Answer in exactly ONE word: ${prompt}` }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return "AI_SERVICE_ERROR";
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return text ? text.trim().split(/\s+/)[0] : "NO_ANSWER";
    } catch (error) {
        console.error("Gemini Fetch Error:", error);
        return "AI_CONN_ERROR";
    }
};
