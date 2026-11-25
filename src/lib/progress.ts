import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export type DrillResult = {
  correct: number;
  total: number;
  at: string;
};

export type Attempt = {
  id: string;
  examId: string;
  at: string;
  answers: Record<string, string>;
  overrides: Record<string, boolean>;
};

export type Draft = {
  startedAt: number;
  answers: Record<string, string>;
};

type ProgressState = {
  mastered: string[];
  drills: Record<string, DrillResult>;
  stepIndex: Record<string, number>;
  attempts: Attempt[];
  drafts: Record<string, Draft>;
  setStep: (lessonId: string, index: number) => void;
  saveDrill: (lessonId: string, correct: number, total: number) => void;
  setDraftAnswer: (examId: string, questionId: string, value: string) => void;
  startDraft: (examId: string, fresh: boolean) => void;
  clearDraft: (examId: string) => void;
  saveAttempt: (examId: string, answers: Record<string, string>) => string;
  setOverride: (attemptId: string, key: string, pass: boolean) => void;
  clearOverride: (attemptId: string, key: string) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      mastered: [],
      drills: {},
      stepIndex: {},
      attempts: [],
      drafts: {},
      setStep: (lessonId, index) =>
        set((state) => ({ stepIndex: { ...state.stepIndex, [lessonId]: index } })),
      saveDrill: (lessonId, correct, total) =>
        set((state) => {
          const mastered = new Set(state.mastered);
          if (total > 0 && correct / total >= 2 / 3) mastered.add(lessonId);
          else mastered.delete(lessonId);
          return {
            mastered: [...mastered],
            drills: {
              ...state.drills,
              [lessonId]: { correct, total, at: new Date().toISOString() },
            },
          };
        }),
      startDraft: (examId, fresh) =>
        set((state) => {
          if (!fresh && state.drafts[examId]) return state;
          return {
            drafts: {
              ...state.drafts,
              [examId]: { startedAt: Date.now(), answers: {} },
            },
          };
        }),
      setDraftAnswer: (examId, questionId, value) =>
        set((state) => {
          const current = state.drafts[examId] ?? { startedAt: Date.now(), answers: {} };
          return {
            drafts: {
              ...state.drafts,
              [examId]: {
                startedAt: current.startedAt,
                answers: { ...current.answers, [questionId]: value },
              },
            },
          };
        }),
      clearDraft: (examId) =>
        set((state) => {
          const drafts = { ...state.drafts };
          delete drafts[examId];
          return { drafts };
        }),
      saveAttempt: (examId, answers) => {
        const id = `${examId}-${Date.now()}`;
        set((state) => {
          const drafts = { ...state.drafts };
          delete drafts[examId];
          return {
            drafts,
            attempts: [
              { id, examId, at: new Date().toISOString(), answers, overrides: {} },
              ...state.attempts,
            ],
          };
        });
        return id;
      },
      setOverride: (attemptId, key, pass) =>
        set((state) => ({
          attempts: state.attempts.map((attempt) =>
            attempt.id === attemptId
              ? { ...attempt, overrides: { ...attempt.overrides, [key]: pass } }
              : attempt,
          ),
        })),
      clearOverride: (attemptId, key) =>
        set((state) => ({
          attempts: state.attempts.map((attempt) => {
            if (attempt.id !== attemptId) return attempt;
            const overrides = { ...attempt.overrides };
            delete overrides[key];
            return { ...attempt, overrides };
          }),
        })),
    }),
    { name: "oracle-zero-hero" },
  ),
);

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useProgress.persist.onFinishHydration(() => setHydrated(true));
    if (useProgress.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}
