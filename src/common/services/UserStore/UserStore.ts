import create from "zustand";
import { UserState } from "./UserState/UserState";

/**
 * Zustand Store of User
 */
const useUserStore = create<UserState>()((set) => ({
  user: { id: 1 },
  setUser: (newUser) => set({ user: newUser }),
  increaseUserId: () =>
    set((state) => ({
      user: { ...state.user, id: state.user?.id ? state.user?.id + 1 : 0 },
    })),
}));

export { useUserStore };
