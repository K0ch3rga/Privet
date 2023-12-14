import * as yup from 'yup';

export const UserDataSchemas = {
  full_name: "Иванов Иван",
  sex: "male",
  birth_date: "1990-01-01",
  native_language: "русский",
  other_languages_and_levels: "английский - B2",
  contacts:{
    vk: "https://vk.com/ivanov",
    phone: "726789",
    telegram: "@ivanov",
    whatsapp: "+79123456789"
  }
};

// export const userSchema = yup.object(UserDataSchemas);