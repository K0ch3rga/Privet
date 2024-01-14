import { ColorValue } from "react-native"
import { create } from "zustand"
import { buddyColor, leaderColor, mainColor } from "../defaultColors"

type AccountState = { 
  isLoggedIn: boolean,
  user_id: number,
  isBuddy: boolean,
  isBuddyConfirmed: boolean,
  isLeader: boolean,
  isPaid: boolean,
  isArrivalExist: boolean,
  setLoggedIn: (newValue: boolean) => void,
  setUserId: (newId: number) => void,
  setBuddy: (isBuddy: boolean) => void,
  setPaid: (isPaid: boolean) => void,
  setArrivalExist: (isArrivalExist: boolean) => void,
  buddyStudentId: 0
}

export const useAccountStore = create<AccountState>((set) => ({
  isLoggedIn: true,
  user_id: 64,
    // 58 - test49
    // 62 - Vasya
    // 64 - buddy
  isBuddy: false,
  isBuddyConfirmed: true,
  isLeader: true,
  isPaid: false,
  isArrivalExist: true,
  setLoggedIn: (newValue: boolean) => {set({isLoggedIn: newValue})},
  setUserId: (newId: number) => {set({user_id: newId})},
  setBuddy: (newValue: boolean) => {set({isBuddy: newValue})},
  setPaid: (newValue: boolean) => {set({isPaid: newValue})},
  setArrivalExist: (newValue: boolean) => {set({isArrivalExist: newValue})},
  buddyStudentId: 0
}))

export const getPageColor = () => {
  if (useAccountStore.getState().isBuddy)
    return buddyColor;
  else if (useAccountStore.getState().isLeader)
   return leaderColor;
  else
    return mainColor;

}