import { create } from 'zustand';
import { IStudent } from '../classes/IStudent';


type StudentStore = {
  studentData: IStudent
  setStudentData: (newUser: IStudent) => void
}

export const useStudentStore = create<StudentStore>((set) => ({
  studentData: {},
  setStudentData: (newUser: IStudent) => {set({studentData: newUser})}
}))

