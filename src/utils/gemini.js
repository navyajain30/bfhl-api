import fetch from 'node-fetch';

export const callGemini = async (prompt) => {
    // Using GROQ_API_KEY as per new configuration
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        console.error("Groq API Key missing");
        return "API_KEY_MISSING";
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Groq API Error:", data.error);
            return "AI_SERVICE_ERROR";
        }

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error("Invalid response from Groq API:", data);
            return "AI_SERVICE_ERROR";
        }

        return data.choices[0].message.content.trim().split(/\s+/)[0];

    } catch (error) {
        console.error("Groq Fetch Error:", error);
        return "AI_CONN_ERROR";
    }
};
