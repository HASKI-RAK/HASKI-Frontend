import User from "src/common/core/User/User";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user?: User;
  setUser: (newUser: User) => void;
  setId: (newId: number) => void;
}

export const useUserState = create<UserState>()(
  devtools(
    persist((set) => ({
      user: {},
      setUser: (newUser) => set({ user: newUser }),
      setId: (newId) => set({ user: { id: newId } }),
    }))
  )
);
