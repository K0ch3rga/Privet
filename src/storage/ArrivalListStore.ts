import { create } from "zustand"
import { IArrivaList } from "../classes/IArrivalList"

type ArrivalListState = { 
  arrivalList: IArrivaList[],
  setArrivaList: (newList: IArrivaList[]) => void
}

export const useArrivalListStore = create<ArrivalListState>((set) => ({
  arrivalList: [],
  setArrivaList: (newList: IArrivaList[]) => {set({arrivalList: newList})}
}))