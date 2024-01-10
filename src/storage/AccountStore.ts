import { create } from "zustand"

type AccountState = { 
  isLoggedIn: boolean,
  user_id: number,
  isBuddy: boolean,
  isPaid: boolean,
  isArrivalExist: boolean,
  setLoggedIn: (newValue: boolean) => void,
  setUserId: (newId: number) => void,
  setBuddy: (isBuddy: boolean) => void,
  setPaid: (isPaid: boolean) => void,
  setArrivalExist: (isArrivalExist: boolean) => void
}

export const useAccountStore = create<AccountState>((set) => ({
  isLoggedIn: true,
  user_id: 58,
  isBuddy: false,
  isPaid: false,
  isArrivalExist: false,
  setLoggedIn: (newValue: boolean) => {set({isLoggedIn: newValue})},
  setUserId: (newId: number) => {set({user_id: newId})},
  setBuddy: (newValue: boolean) => {set({isBuddy: newValue})},
  setPaid: (newValue: boolean) => {set({isPaid: newValue})},
  setArrivalExist: (newValue: boolean) => {set({isArrivalExist: newValue})}
}))