# Sample Flask Backend

This is a minimal Flask backend for testing the Personal Career Navigator frontend.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

## Endpoints

### POST /analyze
Analyzes resume and returns career readiness data.

**Request:**
```json
{
  "resume_text": "Your resume content...",
  "target_role": "Frontend Developer"
}
```

**Response:**
See main README for full response structure.

### GET /health
Health check endpoint.

## Note

This is a **sample backend with mock data** for testing purposes. Replace with actual AI analysis logic for production use.
