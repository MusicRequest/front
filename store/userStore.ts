import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/types";

interface IUserStore {
  user: User | null;
  setUser: (newUser: User | null) => void;
}

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      user: null,
      setUser: (newUser: User | null) => set({ user: newUser }),
    }),
    { name: "user" },
  ),
);
