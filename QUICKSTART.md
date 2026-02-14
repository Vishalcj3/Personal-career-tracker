# Quick Start Guide

Get Personal Career Navigator running locally in 5 minutes.

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org))
- Python 3.8+ installed ([Download](https://python.org))
- Firebase account ([Sign up](https://firebase.google.com))

## Step 1: Clone and Install

```bash
cd personal-career-navigator
npm install
```

## Step 2: Firebase Setup (5 minutes)

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Click "Add project"
   - Name it "career-navigator"
   - Click through setup

2. **Enable Authentication**
   - Click "Authentication" → "Get started"
   - Enable "Email/Password"
   - Enable "Google" (add support email)

3. **Create Firestore**
   - Click "Firestore Database" → "Create database"
   - Start in "test mode" (change rules later)
   - Click "Enable"

4. **Get Config**
   - Click gear icon → "Project settings"
   - Scroll down → Click web icon `</>`
   - Copy the config object

## Step 3: Configure App

1. **Create .env file**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env with your Firebase config**
   ```env
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_API_URL=http://localhost:5000
   ```

3. **Update src/config/firebase.js**
   Replace the placeholder config with your actual Firebase config.

## Step 4: Start Backend

```bash
cd backend-sample
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend should now be running on http://localhost:5000

## Step 5: Start Frontend

Open a new terminal:

```bash
npm run dev
```

Frontend should now be running on http://localhost:3000

## Step 6: Test the App

1. **Sign Up**
   - Go to http://localhost:3000
   - Click "Sign Up"
   - Enter email and password
   - Click "Create Account"

2. **Upload Resume**
   - Create a simple .txt file with some skills
   - Click "Upload Resume"
   - Select your target role
   - Click "Analyze Resume"

3. **Explore Dashboard**
   - View your readiness score
   - Check skill gaps
   - Explore the roadmap
   - Click on checkpoints
   - Mark a checkpoint as complete

4. **Verify Persistence**
   - Refresh the page
   - Your progress should be saved!

## Common Issues

### "Firebase not initialized"
- Double-check your .env file
- Make sure you updated src/config/firebase.js
- Restart the dev server

### "Backend connection failed"
- Ensure Flask backend is running on port 5000
- Check VITE_API_URL in .env is http://localhost:5000

### "CORS error"
- Flask backend should have flask-cors installed
- Check backend terminal for errors

### "Firestore permission denied"
- In Firebase Console, go to Firestore → Rules
- For testing, set to test mode:
  ```
  allow read, write: if true;
  ```
- Don't use test mode in production!

## Next Steps

- Read [README.md](README.md) for full documentation
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize the app for your needs
- Replace sample backend with AI analysis

## Getting Help

- Check Firebase Console for errors
- Check browser console for errors
- Check backend terminal for errors
- Review documentation files

Enjoy building with Personal Career Navigator! 🚀
