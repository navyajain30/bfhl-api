# Deployment Guide

### Prerequisites
- Node.js installed locally
- Git installed locally
- GitHub account
- Vercel account

### 1. Push to GitHub
If you haven't already:
```bash
git add .
git commit -m "Final version"
# Create a new repo on GitHub manually or via gh cli
# gh repo create bfhl-api --public --source=. --remote=origin
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bfhl-api.git
git push -u origin main
```

### 2. Deploy to Vercel
1.  Install Vercel CLI (if not installed):
    ```bash
    npm install -g vercel
    ```

2.  Login to Vercel:
    ```bash
    vercel login
    ```

3.  Deploy:
    ```bash
    vercel
    ```
    - Follow the prompts.
    - Set up your project.

4.  **Environment Variables**:
    - Go to your Vercel Project Dashboard > Settings > Environment Variables.
    - Add `GEMINI_KEY` with your API key.
    - Redeploy if necessary (Propagation might need a new deployment).

5.  **Verify**:
    - Build logs should show success.
    - Visit `https://your-project-name.vercel.app/health`.
    - Test `POST /bfhl` using Curl or Postman.
