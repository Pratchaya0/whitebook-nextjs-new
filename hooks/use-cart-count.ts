import { create } from "zustand";

type CountCart = {
  count: number;
  increase: () => void;
  decrease: () => void;
  removeAll: () => void;
  update: (newBears: number) => void;
};

export const useCountCart = create<CountCart>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  removeAll: () => set({ count: 0 }),
  update: (newBears: number) => set({ count: newBears }),
}));
