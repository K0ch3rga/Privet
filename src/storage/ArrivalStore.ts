import { create } from "zustand"
import { IArrival } from "../classes/IArrival"

type ArrivalStore = { 
  arrivalData: IArrival,
  isSuccess: boolean,
  currentId: number,
  setCurrentId: (newId: number) => void,
  setArrivalData: (newData: IArrival) => void,
  setSuccess: (newValue: boolean) => void
}

export const useArrivalStore = create<ArrivalStore>((set) => ({
  arrivalData: {},
  isSuccess: false,
  currentId: 0,
  setCurrentId: (newId: number) =>(set({currentId: newId})),
  setArrivalData: (newData: IArrival) => (set({arrivalData: newData})),
  setSuccess: (newValue: boolean) => (set({isSuccess: newValue}))
}))