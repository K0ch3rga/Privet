import * as yup from "yup";
import { userSchema } from "../Schemas/UserDataSchema";

export type UserDataProps = yup.InferType<typeof userSchema>;