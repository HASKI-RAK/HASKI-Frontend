import User from "src/common/core/User/User";
import create from "zustand";

interface UserState {
  user: User;
  setUser: (newUser: User) => void;
  increaseId: () => void;
}

export const useUserState = create<UserState>()((set) => ({
  user: { id: 1, firstName: "Max", surName: "Mustermann" },
  setUser: (newUser) => set({ user: newUser }),
  increaseId: () =>
    set((state) => ({
      user: { ...state.user, id: state.user?.id ? state.user?.id + 1 : 0 },
    })),
}));
