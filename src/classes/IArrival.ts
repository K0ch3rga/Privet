import { IStudent } from "./IStudent"

export interface IArrival {
  id?: number,
  students?: IStudent[],
  arrival_date?: string,
  arrival_time?: string,
  flight_number?: string,
  arrival_point?: string,
  comment?: string,
  tickes?: number[],
  buddy_full_names?: string[],
  buddy_id?: number[]
}