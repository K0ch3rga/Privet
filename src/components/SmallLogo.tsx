import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ColorValue } from 'react-native';


type SmallLogoProps = {
  title: string,
  gap: number
}

const SmallLogo: React.FC<SmallLogoProps> = (props) => {  
  return (
      <View style={[styles.header, {gap: props.gap}]}>
        <Image style={styles.logo} source={require("../assets/logo.png")}/>
        <Text style={styles.title}>{props.title}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 85,
    height: 85
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "LilitaOne",
    color: "#455A64",
    textAlign: "center"
  }
});

export default SmallLogo;