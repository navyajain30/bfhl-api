
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testEndpoint(name, url, method = 'GET', body = null) {
    console.log(`\n--- Testing ${name} ---`);
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);
        const data = await response.json();

        console.log(`Status: ${response.status}`);
        console.log(`Response:`, JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error(`FAILED: ${error.message}`);
    }
}

async function runTests() {
    // 1. Health Check
    await testEndpoint('GET /health', `${BASE_URL}/health`);

    // 2. Fibonacci
    await testEndpoint('POST /bfhl (Fibonacci 8)', `${BASE_URL}/bfhl`, 'POST', { fibonacci: 8 });

    // 3. Prime
    await testEndpoint('POST /bfhl (Prime [1,2,3,4,5,6,7])', `${BASE_URL}/bfhl`, 'POST', { prime: [1, 2, 3, 4, 5, 6, 7] });

    // 4. LCM
    await testEndpoint('POST /bfhl (LCM [4, 6])', `${BASE_URL}/bfhl`, 'POST', { lcm: [4, 6] });

    // 5. HCF
    await testEndpoint('POST /bfhl (HCF [12, 18])', `${BASE_URL}/bfhl`, 'POST', { hcf: [12, 18] });

    // 6. AI (Expect Error or Placeholder if no key)
    await testEndpoint('POST /bfhl (AI Question)', `${BASE_URL}/bfhl`, 'POST', { AI: "What is the capital of France?" });

    // 7. Invalid - Multiple Keys
    await testEndpoint('POST /bfhl (Invalid: Multiple Keys)', `${BASE_URL}/bfhl`, 'POST', { fibonacci: 5, prime: [2] });

    // 8. Invalid - Wrong Type
    await testEndpoint('POST /bfhl (Invalid: Wrong Type)', `${BASE_URL}/bfhl`, 'POST', { fibonacci: "eight" });

    // 9. Invalid - Empty Array
    await testEndpoint('POST /bfhl (Invalid: Empty Array)', `${BASE_URL}/bfhl`, 'POST', { prime: [] });

    // 10. Invalid - Negative Fibonacci
    await testEndpoint('POST /bfhl (Invalid: Negative Fib)', `${BASE_URL}/bfhl`, 'POST', { fibonacci: -5 });
}

runTests();
