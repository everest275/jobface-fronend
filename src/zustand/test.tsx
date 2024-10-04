// store/animationStore.ts
import { create } from 'zustand';

interface AnimationState {
  showAnimation: boolean;
  setShowAnimation: (value: boolean) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  showAnimation: false,
  setShowAnimation: (value) => set({ showAnimation: value }),
}));
