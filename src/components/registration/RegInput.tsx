import { View, Text, StyleSheet, Image, TextInput, StyleProp, ViewStyle, ColorValue } from 'react-native';
import { useState } from "react";


export type RegInputProps = {
  placeholder: string
  wrong? : boolean
  wrongMsg? : string
  style?: StyleProp<ViewStyle>
}

const RegInput: React.FC<RegInputProps> = (props) => {
  const [active, setActive] = useState(false);
  const textColor = active ? "black" : "rgba(69, 90, 100, 0.42)";
  const inputStyle = [styles.input, {color: textColor}, props.wrong && styles.wrong]
  
  return (
    <View style={styles.wrapper}>
      <TextInput 
        style={inputStyle}
        placeholder={props.placeholder}
        onChangeText={(text: string) => {setActive(text != "")}} />
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
    borderColor: "#FFD869",
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
