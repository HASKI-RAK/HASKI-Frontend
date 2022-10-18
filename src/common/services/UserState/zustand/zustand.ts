import create from "zustand";
import { UserState } from "../UserState";

/**
 * Zustand Store of User
 */
const useUserStore = create<UserState>()((set) => ({
  user: {},
  setUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
  increaseUserId: () =>
    set((state) => ({
      user: { ...state.user, id: state.user?.id ? state.user?.id + 1 : 0 },
    })),
}));

export { useUserStore };
