import { useState, useEffect } from 'react';
import { getPriorityColor } from '../utils/helpers';

const RoadmapTimeline = ({ roadmap, completedCheckpoints, onCheckpointComplete }) => {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);

  // Flatten all checkpoints for easy indexing
  const allCheckpoints = roadmap.flatMap(phase => 
    phase.checkpoints.map(checkpoint => ({
      ...checkpoint,
      phase: phase.phase
    }))
  );

  useEffect(() => {
    // Find the first incomplete checkpoint
    const firstIncomplete = allCheckpoints.findIndex(
      checkpoint => !completedCheckpoints.includes(checkpoint.id)
    );
    setCurrentCheckpointIndex(firstIncomplete !== -1 ? firstIncomplete : allCheckpoints.length - 1);
  }, [completedCheckpoints, allCheckpoints]);

  const handleCheckpointClick = (checkpoint) => {
    setSelectedCheckpoint(checkpoint);
  };

  const handleMarkComplete = async () => {
    if (selectedCheckpoint && !completedCheckpoints.includes(selectedCheckpoint.id)) {
      await onCheckpointComplete(selectedCheckpoint.id, selectedCheckpoint.impact_percentage);
      setSelectedCheckpoint(null);
    }
  };

  const isCheckpointCompleted = (checkpointId) => {
    return completedCheckpoints.includes(checkpointId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
        90-Day Roadmap
      </h2>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-max">
          {roadmap.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="mb-8 last:mb-0">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800">{phase.phase}</h3>
                <p className="text-sm text-slate-500">Days {phase.days_range}</p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200" 
                     style={{ 
                       backgroundImage: 'repeating-linear-gradient(to right, #cbd5e1 0, #cbd5e1 8px, transparent 8px, transparent 16px)'
                     }}
                />

                <div className="flex gap-8 relative">
                  {phase.checkpoints.map((checkpoint, checkpointIndex) => {
                    const globalIndex = allCheckpoints.findIndex(c => c.id === checkpoint.id);
                    const isCompleted = isCheckpointCompleted(checkpoint.id);
                    const isCurrent = globalIndex === currentCheckpointIndex;

                    return (
                      <div key={checkpoint.id} className="relative flex-shrink-0">
                        {/* Checkpoint Node */}
                        <button
                          onClick={() => handleCheckpointClick(checkpoint)}
                          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all transform hover:scale-110 ${
                            isCompleted
                              ? 'bg-success-500 border-success-600 shadow-lg'
                              : isCurrent
                              ? 'bg-white border-primary-500 shadow-lg animate-pulse-slow'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <div className={`w-3 h-3 rounded-full ${isCurrent ? 'bg-primary-500' : 'bg-slate-400'}`} />
                          )}
                        </button>

                        {/* Car Icon */}
                        {isCurrent && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out">
                            <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                            </svg>
                          </div>
                        )}

                        {/* Checkpoint Label */}
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 text-center">
                          <p className="text-xs font-medium text-slate-700 line-clamp-2">
                            {checkpoint.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {checkpoint.estimated_days}d
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkpoint Detail Popup */}
      {selectedCheckpoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCheckpoint(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-900">{selectedCheckpoint.title}</h3>
              <button
                onClick={() => setSelectedCheckpoint(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Skill:</span>
                <span className="text-sm font-semibold text-slate-900">{selectedCheckpoint.skill}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Priority:</span>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-${getPriorityColor(selectedCheckpoint.priority)}-100 text-${getPriorityColor(selectedCheckpoint.priority)}-700`}>
                  {selectedCheckpoint.priority}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Impact:</span>
                <span className="text-sm font-semibold text-slate-900">+{selectedCheckpoint.impact_percentage}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Duration:</span>
                <span className="text-sm font-semibold text-slate-900">{selectedCheckpoint.estimated_days} days</span>
              </div>
            </div>

            {!isCheckpointCompleted(selectedCheckpoint.id) ? (
              <button
                onClick={handleMarkComplete}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Mark as Completed
              </button>
            ) : (
              <div className="w-full bg-success-50 text-success-700 py-3 rounded-lg font-medium text-center border border-success-200">
                ✓ Completed
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapTimeline;
