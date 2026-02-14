# Deployment Guide

Complete guide for deploying Personal Career Navigator to production.

## Table of Contents
1. [Firebase Setup](#firebase-setup)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Domain Configuration](#domain-configuration)

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name (e.g., "career-navigator")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** provider
4. Enable **Google** provider
   - Add support email
   - Click "Save"

### 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode**
4. Choose location (closest to your users)
5. Click "Enable"

### 4. Set Firestore Rules

Go to **Firestore Database → Rules** and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Register app with nickname
5. Copy the `firebaseConfig` object

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Set Environment Variables**
   Create `vercel.json`:
   ```json
   {
     "env": {
       "VITE_FIREBASE_API_KEY": "@firebase-api-key",
       "VITE_FIREBASE_AUTH_DOMAIN": "@firebase-auth-domain",
       "VITE_FIREBASE_PROJECT_ID": "@firebase-project-id",
       "VITE_FIREBASE_STORAGE_BUCKET": "@firebase-storage-bucket",
       "VITE_FIREBASE_MESSAGING_SENDER_ID": "@firebase-messaging-sender-id",
       "VITE_FIREBASE_APP_ID": "@firebase-app-id",
       "VITE_API_URL": "@api-url"
     }
   }
   ```

4. **Add secrets to Vercel**
   ```bash
   vercel secrets add firebase-api-key YOUR_API_KEY
   vercel secrets add firebase-auth-domain YOUR_AUTH_DOMAIN
   # ... add all secrets
   ```

5. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the app**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Set environment variables in Netlify Dashboard**
   - Go to Site settings → Environment variables
   - Add all VITE_ variables

### Option 3: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize**
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Set public directory: `dist`
   - Configure as SPA: Yes
   - Don't overwrite index.html

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Backend Deployment

### Option 1: Railway

1. **Create account at [Railway.app](https://railway.app)**

2. **Create new project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your backend repository

3. **Configure**
   - Set root directory to `backend-sample` (if applicable)
   - Railway will auto-detect Flask

4. **Environment Variables**
   - Add any required environment variables
   - Railway provides a public URL automatically

5. **Update Frontend**
   - Update `VITE_API_URL` to Railway URL
   - Redeploy frontend

### Option 2: Render

1. **Create account at [Render.com](https://render.com)**

2. **New Web Service**
   - Connect GitHub repository
   - Select backend folder
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn app:app`

3. **Environment Variables**
   - Add variables in Render dashboard

4. **Deploy**
   - Render auto-deploys on git push

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create app**
   ```bash
   cd backend-sample
   heroku create your-app-name
   ```

4. **Add Procfile**
   ```
   web: gunicorn app:app
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## Domain Configuration

### Custom Domain on Vercel

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed

### Custom Domain on Netlify

1. Go to Domain settings
2. Add custom domain
3. Follow DNS configuration steps

### Custom Domain on Firebase

1. Go to Hosting in Firebase Console
2. Click "Add custom domain"
3. Follow verification steps
4. Update DNS records

## Post-Deployment Checklist

- [ ] Firebase Authentication working
- [ ] Firestore database connected
- [ ] Backend API accessible
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] SSL certificate active (HTTPS)
- [ ] Domain configured (if using custom domain)
- [ ] Test full user flow:
  - [ ] Sign up
  - [ ] Upload resume
  - [ ] Analyze resume
  - [ ] Complete checkpoints
  - [ ] Data persists on refresh
- [ ] Error monitoring set up (optional: Sentry)
- [ ] Analytics configured (optional: Google Analytics)

## Monitoring

### Frontend
- Use Vercel Analytics or Netlify Analytics
- Set up error tracking with [Sentry](https://sentry.io)

### Backend
- Monitor Railway/Render logs
- Set up uptime monitoring (e.g., UptimeRobot)

## Security Checklist

- [ ] Firestore rules properly configured
- [ ] API endpoints protected (if needed)
- [ ] Environment variables not in code
- [ ] HTTPS enabled on all domains
- [ ] CORS configured for production domains only
- [ ] Firebase API keys restricted (in Firebase Console)

## Troubleshooting

### Common Issues

1. **Firebase Auth not working**
   - Add deployment domain to authorized domains
   - Go to Firebase Console → Authentication → Settings → Authorized domains

2. **API CORS errors**
   - Update CORS settings in backend to include frontend domain
   - Ensure backend URL in frontend env is correct

3. **Environment variables not working**
   - Rebuild and redeploy after changing env vars
   - Verify variables are prefixed with `VITE_` for Vite

4. **Firestore permission denied**
   - Check Firestore security rules
   - Ensure user is authenticated before making requests

## Support

For issues, check:
- Firebase documentation
- Vite documentation  
- Vercel/Netlify documentation
- Project GitHub issues
