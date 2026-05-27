import { db, isConfigured } from "./firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

/**
 * Saves a user's ratings for a match.
 * Falls back to LocalStorage if Firebase is not configured.
 */
export async function saveMatchRatings(
  matchId: string,
  userId: string,
  ratings: Record<string, number>
): Promise<void> {
  if (isConfigured && db) {
    try {
      const userRatingDoc = doc(db, "matches", matchId, "user_ratings", userId);
      await setDoc(userRatingDoc, {
        ratings,
        timestamp: new Date().toISOString()
      });
      console.log("Saved ratings to Firestore.");
    } catch (error) {
      console.error("Firestore error saving ratings:", error);
      // Fallback local storage
      localStorage.setItem(`votes_${matchId}`, JSON.stringify(ratings));
    }
  } else {
    // Fallback: LocalStorage
    localStorage.setItem(`votes_${matchId}`, JSON.stringify(ratings));
  }
}

/**
 * Retrieves aggregate average ratings for a match.
 * Falls back to merging user's local votes with initial mock data.
 */
export async function getMatchAverageRatings(
  matchId: string,
  defaultAverages: Record<string, number>
): Promise<Record<string, number>> {
  if (isConfigured && db) {
    try {
      const colRef = collection(db, "matches", matchId, "user_ratings");
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const counts: Record<string, number> = {};
        const sums: Record<string, number> = {};

        snap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && data.ratings) {
            Object.keys(data.ratings).forEach((key) => {
              sums[key] = (sums[key] || 0) + data.ratings[key];
              counts[key] = (counts[key] || 0) + 1;
            });
          }
        });

        const averages: Record<string, number> = {};
        Object.keys(sums).forEach((key) => {
          averages[key] = parseFloat((sums[key] / counts[key]).toFixed(1));
        });
        return averages;
      }
    } catch (error) {
      console.error("Firestore error reading ratings:", error);
    }
  }

  // Fallback: simulate high engagement average merging
  const savedVotesStr = localStorage.getItem(`votes_${matchId}`);
  if (savedVotesStr) {
    try {
      const saved = JSON.parse(savedVotesStr);
      const merged: Record<string, number> = {};
      Object.keys(defaultAverages).forEach((key) => {
        const userVal = saved[key] !== undefined ? saved[key] : defaultAverages[key];
        // Simulate merging one vote into a pool of 14,500 existing votes
        merged[key] = parseFloat(((defaultAverages[key] * 14500 + userVal) / 14501).toFixed(1));
      });
      return merged;
    } catch (e) {
      return defaultAverages;
    }
  }

  return defaultAverages;
}
