# Personal Career Navigator

AI-powered career readiness analysis platform built with React, Vite, Tailwind CSS, and Firebase.

## Features

- **Authentication**: Email/Password and Google Sign-In
- **Resume Analysis**: Upload resume and get AI-powered insights
- **Readiness Score**: Visual circular progress with animated count-up
- **Skill Gap Analysis**: See matched skills and missing skills with priority levels
- **90-Day Roadmap**: Interactive timeline with checkpoint tracking and car animation
- **Checkpoint Completion**: Mark checkpoints as complete and watch your score increase
- **Internship Eligibility**: See which internships you qualify for
- **Progress Persistence**: All progress saved to Firebase Firestore

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Fraunces (display), Epilogue (body), JetBrains Mono (monospace)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Backend API**: Flask (separate repository)

## Prerequisites

- Node.js 18+ and npm
- Firebase account
- Flask backend running (see Backend Integration section)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-career-navigator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy your Firebase config

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   ```

5. **Update Firebase config in code**
   
   Edit `src/config/firebase.js` and replace the placeholder config with your actual Firebase config.

## Running the Application

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Backend Integration

This frontend requires a Flask backend with the following endpoint:

### POST /analyze

**Request:**
```json
{
  "resume_text": "string",
  "target_role": "string"
}
```

**Response:**
```json
{
  "readiness_score": 75,
  "breakdown": {
    "core_skills": 80,
    "tools": 70,
    "projects": 75
  },
  "matched_skills": ["React", "JavaScript", "CSS"],
  "missing_skills": [
    {
      "name": "TypeScript",
      "weight": 10,
      "priority": "High",
      "impact_percentage": 5
    }
  ],
  "roadmap": [
    {
      "phase": "Foundation",
      "days_range": "1-30",
      "checkpoints": [
        {
          "id": "cp_001",
          "title": "Learn TypeScript Basics",
          "skill": "TypeScript",
          "priority": "High",
          "impact_percentage": 5,
          "estimated_days": 7
        }
      ]
    }
  ],
  "internships": [
    {
      "title": "Frontend Developer Intern",
      "tier": "Tier 1",
      "status": "Eligible",
      "missing_requirements": []
    }
  ]
}
```

Make sure your Flask backend is running on the URL specified in `VITE_API_URL`.

## Firestore Structure

```
users/
  {userId}/
    - last_analysis: {object}      // Latest analysis data
    - completed_checkpoints: []     // Array of checkpoint IDs
    - updated_readiness_score: 75   // Current score
    - updated_at: "2026-02-14..."  // ISO timestamp
```

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
personal-career-navigator/
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx           # Authentication screen
│   │   ├── ResumeAnalyzer.jsx     # Resume upload and analysis
│   │   ├── Dashboard.jsx          # Main dashboard container
│   │   ├── ScoreCard.jsx          # Readiness score display
│   │   ├── SkillGapPanel.jsx      # Skill analysis
│   │   ├── RoadmapTimeline.jsx    # 90-day roadmap
│   │   └── InternshipPanel.jsx    # Internship eligibility
│   ├── config/
│   │   └── firebase.js            # Firebase configuration
│   ├── services/
│   │   ├── api.js                 # Backend API calls
│   │   └── firestore.js           # Firestore operations
│   ├── utils/
│   │   └── helpers.js             # Utility functions
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
└── package.json                   # Dependencies
```

## Key Features Implementation

### 1. Animated Readiness Score
- Circular SVG progress ring with CSS transitions
- Count-up animation using `requestAnimationFrame`
- Color-coded based on score (green ≥75%, yellow ≥50%, red <50%)

### 2. Interactive Roadmap
- Horizontal scrollable timeline
- Checkpoint states: completed (green), current (pulsing), locked (grey)
- Animated car icon that moves to current checkpoint
- Modal popup for checkpoint details

### 3. Dynamic Progress Tracking
- Real-time score updates when checkpoints are completed
- Progress persisted to Firestore
- Automatic restoration of progress on login

### 4. Skill Gap Analysis
- Visual badges for matched and missing skills
- Priority-based color coding
- Impact percentage display
- Hover animations for enhanced UX

## Design Philosophy

The application follows a **refined minimalist aesthetic** with:

- **Typography**: Distinctive font pairing (Fraunces display + Epilogue body)
- **Color System**: Professional gradient backgrounds with clean card-based layouts
- **Motion**: Subtle CSS-only animations for professional feel
- **Spacing**: Generous whitespace for clarity and readability
- **Accessibility**: Focus states, proper contrast, semantic HTML

## Troubleshooting

### Firebase Authentication Issues
- Ensure Email/Password and Google providers are enabled in Firebase Console
- Check that authorized domains include `localhost` for development

### Backend Connection Issues
- Verify Flask backend is running on the correct port
- Check CORS is configured in Flask backend
- Verify `VITE_API_URL` in `.env` matches your backend URL

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on the repository.
