import { create } from "zustand";

export type SectionId =
  | "intro"
  | "about"
  | "work"
  | "projects"
  | "contact";

type UiState = {
  active: number;          // current section index (0..n-1)
  progress: number;        // 0..1 within current -> next transition
  curtainDone: boolean;    // true once IntroCurtain finishes
  setActive: (active: number) => void;
  setProgress: (progress: number) => void;
  setCurtainDone: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  active: 0,
  progress: 0,
  curtainDone: false,
  setActive: (active) => set({ active }),
  setProgress: (progress) => set({ progress }),
  setCurtainDone: () => set({ curtainDone: true }),
}));
