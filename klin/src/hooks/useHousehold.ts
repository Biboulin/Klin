import { useState } from 'react';
import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import type { Household, HouseholdMember } from '../types';

export const useHousehold = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHousehold = async (name: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      // Create household
      const householdRef = await addDoc(collection(db, 'households'), {
        name,
        createdAt: new Date(),
        createdBy: user.id,
      } as Household);

      // Add user as admin member
      await setDoc(doc(db, 'households', householdRef.id, 'members', user.id), {
        householdId: householdRef.id,
        userId: user.id,
        role: 'admin',
        joinedAt: new Date(),
      } as HouseholdMember);

      // Generate invite code (simple: first 6 chars of household ID)
      const inviteCode = householdRef.id.substring(0, 8).toUpperCase();

      return householdRef.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create household';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const joinHousehold = async (inviteCode: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      // Find household by invite code (simplified: search first 8 chars)
      const householdsRef = collection(db, 'households');
      const q = query(householdsRef);
      const snapshot = await getDocs(q);

      let householdId: string | null = null;
      snapshot.forEach((doc) => {
        if (doc.id.substring(0, 8).toUpperCase() === inviteCode.toUpperCase()) {
          householdId = doc.id;
        }
      });

      if (!householdId) {
        throw new Error('Invalid invite code');
      }

      // Add user as member
      await setDoc(doc(db, 'households', householdId, 'members', user.id), {
        householdId,
        userId: user.id,
        role: 'member',
        joinedAt: new Date(),
      } as HouseholdMember);

      return householdId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join household';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createHousehold,
    joinHousehold,
    loading,
    error,
  };
};
