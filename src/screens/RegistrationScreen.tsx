import { useState } from "react";
import { View, Text, StyleSheet, Dimensions,  } from 'react-native';
import MainButton from "../components/Buttons/MainButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import RegInput from '../components/RegInput';
import SmallLogo from "../components/Logos/SmallLogo";
import { ScreenProps } from "../interfaces/ScreenProps";
import { mainColor, buddyColor } from "../defaultColors";

var width = Dimensions.get('window').width;

const RegistrationScreen: React.FC<ScreenProps> = ({ navigation }) => {
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
          <MainButton title='Sign Up' color={mainColor} onPress={() => {navigation.navigate("EnterCode")}}/>
          <SecondaryButton title="I'm Buddy" color={buddyColor} />
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
});

export default RegistrationScreen;