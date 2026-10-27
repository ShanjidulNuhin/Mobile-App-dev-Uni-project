import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { newDemoState } from './data';
import type { ActionType, ModerationAction, ModerationRecord, ModerationState } from './types';

const STORAGE_KEY = '@pathsathi_moderation_demo_v1';
const MODERATOR_ID = 'moderator-demo-08';

function reducer(state: ModerationState, action: ModerationAction): ModerationState {
  switch (action.type) {
    case 'HYDRATE': return action.payload;
    case 'SET_TUTOR_STATUS':
      return {
        ...state,
        tutors: state.tutors.map(t => t.id === action.tutorId
          ? { ...t, verificationStatus: action.status, reviewReason: action.reason }
          : t),
        history: [action.record, ...state.history],
      };
    case 'SET_REPORT_STATUS':
      return {
        ...state,
        reports: state.reports.map(r => r.id === action.reportId
          ? { ...r, status: action.status }
          : r),
        history: [action.record, ...state.history],
      };
    case 'ADD_REPORT': return {...state, reports:[action.report,...state.reports]};
    case 'UPSERT_TUTOR': return {...state, tutors:state.tutors.some(t=>t.userId===action.tutor.userId)?state.tutors.map(t=>t.userId===action.tutor.userId?action.tutor:t):[action.tutor,...state.tutors]};
    case 'RESET_DEMO': return newDemoState();
    default: return state;
  }
}
interface ModerationContextValue {
  state: ModerationState;
  dispatch: React.Dispatch<ModerationAction>;
  hydrated: boolean;
}
const ModerationContext = createContext<ModerationContextValue | null>(null);
export function createRecord(type: ActionType, targetId: string, targetLabel: string, reason: string): ModerationRecord {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type, targetId, targetLabel, reason,
    actorId: MODERATOR_ID,
    createdAt: new Date().toISOString(),
  };
}
function isStoredState(value: unknown): value is ModerationState {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<ModerationState>;
  return Array.isArray(v.tutors) && Array.isArray(v.reports) && Array.isArray(v.history);
}
export function ModerationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, newDemoState);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (active && raw) {
          const parsed: unknown = JSON.parse(raw);
          if (isStoredState(parsed)) dispatch({ type: 'HYDRATE', payload: parsed });
        }
      } catch (error) {
        console.warn('Could not read demo state', error);
      } finally {
        if (active) setHydrated(true);
      }
    })();
    return () => { active = false; };
  }, []);
  useEffect(() => {
    // Prevent the seed state from overwriting saved data while loading.
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      .catch(error => console.warn('Could not save demo state', error));
  }, [state, hydrated]);
  return <ModerationContext.Provider value={{ state, dispatch, hydrated }}>{children}</ModerationContext.Provider>;
}
export function useModeration() {
  const context = useContext(ModerationContext);
  if (!context) throw new Error('useModeration must be inside ModerationProvider');
  return context;
}
