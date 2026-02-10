# BFHL REST API

A production-ready REST API built with Node.js and Express, featuring a specific data processing endpoint and Gemini AI integration.

## Features
- **POST /bfhl**: Handles Fibonacci generation, Prime number filtering, LCM/HCF calculation, and AI-powered Q&A.
- **GET /health**: simple health check endpoint.
- **AI Integration**: Uses Google Gemini to provide single-word answers to questions.
- **CORS Enabled**: secure cross-origin requests.

## Tech Stack
- Node.js
- Express.js
- Google Gemini API

## Setup & Run

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    cd bfhl-api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    GEMINI_KEY=your_gemini_api_key
    ```

4.  **Start the Server**
    ```bash
    npm start
    ```

## API Endpoints

### 1. POST /bfhl
Accepts a JSON body with **exactly one** of the following keys:

| Key | Type | Description |
| :--- | :--- | :--- |
| `fibonacci` | Integer | Returns Fibonacci sequence of length `n` |
| `prime` | Integer Array | Returns prime numbers from the array |
| `lcm` | Integer Array | Returns LCM of the numbers |
| `hcf` | Integer Array | Returns HCF of the numbers |
| `AI` | String | Returns a single-word AI answer |

**Example Request:**
```json
{
  "fibonacci": 8
}
```

**Success Response:**
```json
{
  "is_success": true,
  "official_email": "navya3887.beai23@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8, 13]
}
```

### 2. GET /health
Checks if the API is running.

**Response:**
```json
{
  "is_success": true,
  "official_email": "navya3887.beai23@chitkara.edu.in"
}
```

## Deployment
This project is configured for Vercel deployment.
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions on how to push to GitHub and deploy to Vercel.

### Quick Start
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel`
3. Set `GEMINI_KEY` in Vercel project settings.
