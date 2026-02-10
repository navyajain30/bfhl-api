
import { isPrime, getFibonacci, getLCM, getHCF } from '../utils/math.js';
import { callGemini } from '../utils/gemini.js';

const EMAIL = "navya3887.beai23@chitkara.edu.in";

export const handleBfhl = async (req, res) => {
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
};
