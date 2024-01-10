import { create } from 'zustand';
import { IUser } from '../classes/IUser';


type UserStore = {
  userData: IUser
  setUserData: (newUser: IUser) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userData: {},
  setUserData: (newUser: IUser) => {set({userData: newUser})}
}))

