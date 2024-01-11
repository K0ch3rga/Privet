import { create } from 'zustand';
import { IBuddy } from '../classes/IBuddy';


type BuddyStore = {
  buddyData: IBuddy
  setBuddyData: (newUser: IBuddy) => void
}

export const useBuddyStore = create<BuddyStore>((set) => ({
  buddyData: {},
  setBuddyData: (newUser: IBuddy) => {set({buddyData: newUser})}
}))

