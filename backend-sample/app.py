"""
Sample Flask Backend for Personal Career Navigator
This is a minimal backend for testing the frontend application.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    """
    Analyze resume endpoint
    Returns mock data for testing
    """
    data = request.json
    resume_text = data.get('resume_text', '')
    target_role = data.get('target_role', '')
    
    # Mock response - replace with actual AI analysis
    response = {
        "readiness_score": 65,
        "breakdown": {
            "core_skills": 70,
            "tools": 60,
            "projects": 65
        },
        "matched_skills": [
            "JavaScript",
            "HTML",
            "CSS",
            "Git",
            "Problem Solving"
        ],
        "missing_skills": [
            {
                "name": "React",
                "weight": 15,
                "priority": "High",
                "impact_percentage": 10
            },
            {
                "name": "TypeScript",
                "weight": 12,
                "priority": "High",
                "impact_percentage": 8
            },
            {
                "name": "Node.js",
                "weight": 10,
                "priority": "Medium",
                "impact_percentage": 7
            },
            {
                "name": "REST APIs",
                "weight": 8,
                "priority": "Medium",
                "impact_percentage": 5
            },
            {
                "name": "Testing (Jest)",
                "weight": 6,
                "priority": "Low",
                "impact_percentage": 4
            }
        ],
        "roadmap": [
            {
                "phase": "Foundation",
                "days_range": "1-30",
                "checkpoints": [
                    {
                        "id": "cp_001",
                        "title": "Master React Fundamentals",
                        "skill": "React",
                        "priority": "High",
                        "impact_percentage": 10,
                        "estimated_days": 14
                    },
                    {
                        "id": "cp_002",
                        "title": "Learn TypeScript Basics",
                        "skill": "TypeScript",
                        "priority": "High",
                        "impact_percentage": 8,
                        "estimated_days": 10
                    },
                    {
                        "id": "cp_003",
                        "title": "Build First React Project",
                        "skill": "React",
                        "priority": "High",
                        "impact_percentage": 7,
                        "estimated_days": 6
                    }
                ]
            },
            {
                "phase": "Intermediate",
                "days_range": "31-60",
                "checkpoints": [
                    {
                        "id": "cp_004",
                        "title": "Node.js Backend Basics",
                        "skill": "Node.js",
                        "priority": "Medium",
                        "impact_percentage": 7,
                        "estimated_days": 12
                    },
                    {
                        "id": "cp_005",
                        "title": "REST API Development",
                        "skill": "REST APIs",
                        "priority": "Medium",
                        "impact_percentage": 5,
                        "estimated_days": 10
                    },
                    {
                        "id": "cp_006",
                        "title": "Full Stack Integration",
                        "skill": "Full Stack",
                        "priority": "Medium",
                        "impact_percentage": 6,
                        "estimated_days": 8
                    }
                ]
            },
            {
                "phase": "Advanced",
                "days_range": "61-90",
                "checkpoints": [
                    {
                        "id": "cp_007",
                        "title": "Testing with Jest",
                        "skill": "Testing",
                        "priority": "Low",
                        "impact_percentage": 4,
                        "estimated_days": 8
                    },
                    {
                        "id": "cp_008",
                        "title": "Deploy Production App",
                        "skill": "DevOps",
                        "priority": "Medium",
                        "impact_percentage": 5,
                        "estimated_days": 7
                    },
                    {
                        "id": "cp_009",
                        "title": "Portfolio Optimization",
                        "skill": "Portfolio",
                        "priority": "Medium",
                        "impact_percentage": 6,
                        "estimated_days": 15
                    }
                ]
            }
        ],
        "internships": [
            {
                "title": "Google Frontend Developer Intern",
                "tier": "Tier 1",
                "status": "Locked",
                "missing_requirements": [
                    "React",
                    "TypeScript",
                    "Advanced Algorithms"
                ]
            },
            {
                "title": "Startup Full Stack Developer",
                "tier": "Tier 2",
                "status": "Eligible",
                "missing_requirements": []
            },
            {
                "title": "Junior Web Developer",
                "tier": "Tier 3",
                "status": "Eligible",
                "missing_requirements": []
            }
        ]
    }
    
    return jsonify(response)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    print("🚀 Flask Backend Starting...")
    print("📍 Running on http://localhost:5000")
    print("🔗 Frontend should connect to this URL")
    app.run(debug=True, host='0.0.0.0', port=5000)
