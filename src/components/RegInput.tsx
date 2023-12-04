import { View, Text, StyleSheet, Image, TextInput, StyleProp, ViewStyle, ColorValue } from 'react-native';
import { useState } from "react";
import { mainColor } from '../defaultColors';


export type RegInputProps = {
  placeholder: string
  wrong? : boolean
  wrongMsg? : string
  style?: StyleProp<ViewStyle>
  setProperty?: React.Dispatch<React.SetStateAction<string>>
}

const RegInput: React.FC<RegInputProps> = (props) => {
  const inputStyle = [styles.input, props.wrong && styles.wrong]
  
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={inputStyle}
        placeholder={props.placeholder}
        placeholderTextColor="rgba(69, 90, 100, 0.42)"
        onChangeText={props.setProperty} />
      {props.wrong && <Text style={styles.wrongText}>{props.wrongMsg}</Text>}
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
    fontFamily: "Manrope-Medium",
    fontSize: 17,
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

export default RegInput;
