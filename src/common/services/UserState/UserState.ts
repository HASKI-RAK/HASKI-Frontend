import {User} from "@core/*";

/**
 * Defines the State for store purposes
 */
export type UserState = {
  user?: User;
  setUser?: (newUser: User) => void;
  increaseUserId?: () => void;
};
