import { useState } from "react";
import { View, Text, StyleSheet, TextInput, StyleProp, ViewStyle, NativeSyntheticEvent, } from 'react-native';
import * as yup from 'yup';
import { ProfileItemTitle } from "./ProfileSection";
import { mainColor, whiteColor } from "../../defaultColors";

export type ProfileInputProps = {
  title: string
  value?: string
  setProperty?: (text: string) => void
  validation?: yup.AnySchema
}

const ProfileInput: React.FC<ProfileInputProps> = (props) => {
  const [wrong, setWrong] = useState(false);
  const [wrongMessage, setWrongMessage] = useState('');
  const inputStyle = [styles.input, wrong && styles.wrong]

  const validate = async (text: string, schema: yup.AnySchema) => {
    await schema.validate(text)
    .then(() => setWrong(false))
    .catch((error) => {
      setWrong(true)
      setWrongMessage(error.message)
    })
  }

  const handleBlur = (e: NativeSyntheticEvent<any>) => {
    if (!!props.validation) {
      validate(e.nativeEvent.text, props.validation)
    }
  }

  return (
    <View style={styles.wrapper}>
      <ProfileItemTitle>{props.title}</ProfileItemTitle>
      <TextInput 
        style={inputStyle}
        onChangeText={props.setProperty}
        onBlur={handleBlur}
        value={props.value}
      />
      {wrong && <Text style={styles.wrongText}>{wrongMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 5
  },
  input: {
    height: 38,
    borderWidth: 2, 
    borderRadius: 10,
    borderColor: mainColor,
    backgroundColor: whiteColor,
    fontFamily: "Manrope-Regular",
    fontSize: 16,
    color: "#000",
    paddingLeft: 11,
    paddingRight: 7,
    paddingVertical: 8
  },
  wrong: {
    borderColor: "#FF6969"
  },
  wrongText: {
    marginTop: 7,
    fontFamily: "Manrope-Light",
    fontSize: 15,
    color: "#455A64",
    textAlign: "center"
  }
});

export default ProfileInput;
