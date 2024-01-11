import { useState } from "react";
import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, } from 'react-native';
import * as yup from 'yup';
import { ItemTitleProfile } from "./ProfileSection";
import { whiteColor } from "../../defaultColors";
import { getPageColor } from "../../storage/AccountStore";

export type ProfileInputProps = {
  title: string
  value?: string
  setProperty?: (text: string) => void
  validation?: yup.AnySchema
  multiline?: boolean
  numberOfLines?: number
  height?: number
}

const pageColor = getPageColor();

const InputProfile: React.FC<ProfileInputProps> = (props) => {
  const [wrong, setWrong] = useState(false);
  const [wrongMessage, setWrongMessage] = useState('');
  const inputStyle = [styles.input, wrong && styles.wrong, props.height && { height: props.height }]

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
      <ItemTitleProfile>{props.title}</ItemTitleProfile>
      <TextInput 
        style={inputStyle}
        onChangeText={props.setProperty}
        onBlur={handleBlur}
        value={props.value}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
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
    borderColor: pageColor,
    backgroundColor: whiteColor,
    fontFamily: "Manrope",
    fontWeight: "400",
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
    fontFamily: "Manrope",
    fontWeight: "300",
    fontSize: 15,
    color: "#455A64",
    textAlign: "center"
  }
});

export default InputProfile;
