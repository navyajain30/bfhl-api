
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure node-fetch v2 is used or handle import differently if v3+ (v2 is safer for require)
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const USER_ID = "navya_jain_18092003"; // Format: john_doe_17091999
const EMAIL = "navya@chitkara.edu.in";
const ROLL_NUMBER = "211099xxxx"; // You should probably replace this with actual

// Logic Functions
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const getFibonacci = (n) => {
    if (n < 0) throw new Error("Negative number for Fibonacci");
    if (n === 0) return [0]; // Or empty? Assuming standard series starts 0, 1
    if (n === 1) return [0]; // 0
    let seq = [0, 1];
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
};

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const getHCF = (arr) => {
    if (!arr.length) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(arr[i], result);
    }
    return result;
};

const getLCM = (arr) => {
    if (!arr.length) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = (Math.abs(arr[i] * result)) / gcd(arr[i], result);
    }
    return result;
};

const callGemini = async (prompt) => {
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


// Routes
app.get('/health', (req, res) => {
    res.json({
        is_success: true,
        official_email: EMAIL
    });
});

app.post('/bfhl', async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        
        // Validation: Exactly one key
        // Allowed keys: fibonacci, prime, lcm, hcf, AI
        const allowedKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
        const presentKeys = keys.filter(k => allowedKeys.includes(k));

        if (presentKeys.length !== 1 || keys.length !== 1) {
             return res.status(400).json({
                is_success: false,
                official_email: EMAIL,
                message: "Request must contain exactly one valid key."
            });
        }

        const key = presentKeys[0];
        const value = body[key];
        let result;

        // Type validation
        if (key === 'fibonacci') {
            if (!Number.isInteger(value)) throw new Error("Value must be an integer");
             result = getFibonacci(value);
        } else if (key === 'prime' || key === 'lcm' || key === 'hcf') {
            if (!Array.isArray(value) || !value.every(Number.isInteger)) throw new Error("Value must be an integer array");
            if (value.length === 0) throw new Error("Array cannot be empty");
            
            if (key === 'prime') result = value.filter(isPrime);
            if (key === 'lcm') result = getLCM(value);
            if (key === 'hcf') result = getHCF(value);
        } else if (key === 'AI') {
            if (typeof value !== 'string') throw new Error("Value must be a string");
            result = await callGemini(value); 
        }

        res.json({
            is_success: true,
            official_email: EMAIL,
            data: result
        });

    } catch (error) {
        res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            message: error.message || "Invalid Request"
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
