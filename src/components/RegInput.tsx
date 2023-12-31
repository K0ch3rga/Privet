import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, StyleProp, ViewStyle, ColorValue, TextInputEndEditingEventData, NativeSyntheticEvent } from 'react-native';
import * as yup from 'yup';

import { mainColor } from '../defaultColors';


export type RegInputProps = {
  placeholder: string
  value?: string
  validation?: yup.AnySchema
  style?: StyleProp<ViewStyle>
  setProperty?: (text: string) => void
  password?: boolean
}

const RegInput: React.FC<RegInputProps> = (props) => {
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
      <TextInput 
        style={inputStyle}
        placeholder={props.placeholder}
        placeholderTextColor="rgba(69, 90, 100, 0.42)"
        onChangeText={props.setProperty}
        secureTextEntry={props.password}
        onBlur={handleBlur}
        value={props.value}
      />
      {wrong && <Text style={styles.wrongText}>{wrongMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
  },
  input: {
    height: 45,
    borderWidth: 4, 
    borderRadius: 10,
    borderColor: mainColor,
    paddingLeft: 20,
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 17,
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

export default RegInput;
