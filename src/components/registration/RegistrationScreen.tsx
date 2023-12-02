import { useState } from "react";
import { View, Text, StyleSheet, Dimensions,  } from 'react-native';
import YellowButton from '../YellowButton';
import RegInput from './RegInput';
import SmallLogo from "../SmallLogo";

var width = Dimensions.get('window').width;

const RegistrationScreen: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <SmallLogo title="Privet, let's get started!" gap={24} />

      <View style={styles.bottomGroup}>
        <View style={styles.inputFields}>
          <RegInput placeholder='Full Name'/>
          <RegInput placeholder='University' />
          <RegInput placeholder='E-mail' wrong={false} wrongMsg="Invalid E-Mail"/>
          <RegInput placeholder='Password' wrong={false} wrongMsg="Invaild password: not enough/no digits"/>
          <RegInput placeholder='Confirm Password' wrong={false} wrongMsg="Passwords don’t match"/>
          <Text style={styles.inputHints}>Password must contain small and capital letters, as well as 4 different digits</Text>
        </View>

        <View style={styles.navButtons}>
          <YellowButton title='Sign Up' />
          <YellowButton title="I'm Buddy" buttonStyle={styles.blueButton} titleStyle={styles.blueButtonText} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    gap: 113,
    padding: 35,
    paddingTop: 33,
  },
  bottomGroup: {
    justifyContent: "center",
    alignItems: "center",
    gap: 50
  },
  inputFields: {
    width: width,
    paddingHorizontal: 35,
    gap: 20
  },
  inputHints: {
    fontSize: 15,
    fontFamily: "Manrope-Regular",
    textAlign: "center",
    marginHorizontal: 10,
    color: "#455A64"
  },
  navButtons: {
    gap: 18
  },
  blueButton: {
    borderColor: "#0052B4",
    borderWidth: 1,
    backgroundColor: "white"
  },
  blueButtonText: {
    color: "#0052B4",
  }
});

export default RegistrationScreen;