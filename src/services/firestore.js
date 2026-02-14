import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const saveUserAnalysis = async (userId, analysisData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      last_analysis: analysisData,
      completed_checkpoints: [],
      updated_readiness_score: analysisData.readiness_score,
      updated_at: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
};

export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

export const completeCheckpoint = async (userId, checkpointId, impactPercentage, currentScore) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userData = await getUserProgress(userId);
    
    const completedCheckpoints = userData?.completed_checkpoints || [];
    
    if (!completedCheckpoints.includes(checkpointId)) {
      completedCheckpoints.push(checkpointId);
      const newScore = Math.min(100, currentScore + impactPercentage);
      
      await updateDoc(userRef, {
        completed_checkpoints: completedCheckpoints,
        updated_readiness_score: newScore,
        updated_at: new Date().toISOString()
      });
      
      return newScore;
    }
    
    return currentScore;
  } catch (error) {
    console.error('Error completing checkpoint:', error);
    throw error;
  }
};
