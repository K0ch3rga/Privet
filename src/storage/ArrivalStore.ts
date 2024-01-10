import { create } from "zustand"
import { IArrival } from "../classes/IArrival"

type ArrivalStore = { 
  arrivalData: IArrival,
  isSuccess: boolean,
  setArrivalData: (newData: IArrival) => void,
  setSuccess: (newValue: boolean) => void
}

export const useArrivalStore = create<ArrivalStore>((set) => ({
  arrivalData: {},
  isSuccess: false,
  setArrivalData: (newData: IArrival) => (set({arrivalData: newData})),
  setSuccess: (newValue: boolean) => (set({isSuccess: newValue}))
}))