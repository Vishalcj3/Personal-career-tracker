export const analyzeResume = async (file, targetRole) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('role', targetRole); // Changed from 'target_role' to 'role'

  const response = await fetch('http://127.0.0.1:5000/analyze', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Backend error');
  }

  const data = await response.json();
  
  return {
    readiness_score: Math.round(data.readiness),
    breakdown: {
      core_skills: Math.round(data.readiness + 10),
      tools: Math.round(data.readiness),
      projects: Math.round(data.readiness + 5)
    },
    matched_skills: Object.keys(data.extracted_skills || {}),
    missing_skills: Object.entries(data.gaps || {}).map(([name, info]) => ({
      name: name.toUpperCase(),
      weight: info.weight,
      priority: info.gap_score > 10 ? 'High' : info.gap_score > 5 ? 'Medium' : 'Low',
      impact_percentage: info.gap_score
    })),
    roadmap: [
      {
        phase: "Foundation (Week 1-2)",
        days_range: "1-14",
        checkpoints: [...(data.roadmap?.week1 || []), ...(data.roadmap?.week2 || [])].map((task, i) => ({
          id: `cp_${i}`,
          title: task.task,
          skill: task.skill.toUpperCase(),
          priority: 'High',
          impact_percentage: 5,
          estimated_days: 3
        }))
      },
      {
        phase: "Intermediate (Week 3)",
        days_range: "15-21",
        checkpoints: (data.roadmap?.week3 || []).map((task, i) => ({
          id: `cp_w3_${i}`,
          title: task.task,
          skill: task.skill.toUpperCase(),
          priority: 'Medium',
          impact_percentage: 7,
          estimated_days: 7
        }))
      },
      {
        phase: "Review (Week 4)",
        days_range: "22-30",
        checkpoints: (data.roadmap?.week4 || []).map((task, i) => ({
          id: `cp_w4_${i}`,
          title: task.task,
          skill: task.skill.toUpperCase(),
          priority: 'Low',
          impact_percentage: 3,
          estimated_days: 2
        }))
      }
    ],
    internships: [
      {
        title: "Senior Software Developer",
        tier: "Tier 1",
        status: data.readiness > 80 ? "Eligible" : "Locked",
        missing_requirements: data.readiness > 80 ? [] : data.priority?.slice(0, 3) || []
      },
      {
        title: "Software Developer",
        tier: "Tier 2",
        status: data.readiness > 50 ? "Eligible" : "Locked",
        missing_requirements: data.readiness > 50 ? [] : data.priority?.slice(0, 2) || []
      },
      {
        title: "Junior Developer",
        tier: "Tier 3",
        status: "Eligible",
        missing_requirements: []
      }
    ]
  };
};