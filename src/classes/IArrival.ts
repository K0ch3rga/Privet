export interface IArrival {
  citizenship?: string,
  sex?: string,
  user?: {
    user_info?: {
      full_name?: string,
      contacts?: {
        vk?: string,
        phone?: string,
        telegram?: string,
        whatsapp?: string
      }
    }
  },
  arrival_booking?: {
    id?: number,
    arrival_date?: string,
    arrival_time?: string,
    flight_number?: string,
    arrival_point?: string,
    comment?: string,
    other_students?: number[]
  }
}