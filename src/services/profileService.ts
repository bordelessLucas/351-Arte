import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { UserProfile } from './authService';

export const profileService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  },

  async updateProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, data);
  }
};

