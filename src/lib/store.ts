import { create } from "zustand";

interface ThreadFormStore {
  threads: Object;
  setThreads: (threads: Object) => void;
  clearThreads: () => void;
}

export const useThreadFormStore = create<ThreadFormStore>((set) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
  clearThreads: () => set({ threads: [] }),
}));
