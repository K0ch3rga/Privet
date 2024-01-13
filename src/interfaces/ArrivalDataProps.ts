type ArrivalDataProps = { // arrival_booking
  id: number;
  tickets: {file: string}[];
  arrival_DateTime: Date;
  flight_number: string;
  arrival_point: string;
  comment: string;
  other_students: number[];
};

export default ArrivalDataProps;
