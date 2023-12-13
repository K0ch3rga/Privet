import * as yup from 'yup';

export const UserDataSchemas = {
  university: yup.string().required("This field is required"),
  email: yup.string().email("Invalid E-mail").required("This field is required"),
  password: yup.string()
    .min(8, "Password is too short")
    .matches(new RegExp("(?=[^A-Z]*[A-Z])"), "Password should have at least one upper case letter")
    .matches(new RegExp("(?=[^a-z]*[a-z])"), "Password should have at least one lower case letter")
    .matches(new RegExp("(?=[^0-9]*[0-9])"), "Password should have at one digit")
    .required("This field is required")
    .trim()
};

export const userSchema = yup.object(UserDataSchemas);