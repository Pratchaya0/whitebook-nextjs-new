import { create } from "zustand";

type DeleteState = {
  isDeleted: boolean;
  update: (newBears: boolean) => void;
};

export const useDeleState = create<DeleteState>()((set) => ({
  isDeleted: false,
  update: (newBears: boolean) => set({ isDeleted: newBears }),
}));
