import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput,  } from 'react-native';
import MainButton from "../components/Buttons/MainButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import RegInput from '../components/RegInput';
import SmallLogo from "../components/Logos/SmallLogo";
import { ScreenProps } from "../interfaces/ScreenProps";
import { mainColor, buddyColor } from "../defaultColors";

var width = Dimensions.get('window').width;

type RegRequestProps = {
  university: string,
  email: string,
  password: string
}

const sendRegRequest  = async (university: string, email: string, password: string) => {
  const url = 'http://127.0.0.1:8000/api/v1/signup/student/'
  const data: RegRequestProps = {
    university: university,
    email: email,
    password: password,
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const json = await response.json();
    console.log("Успех:", JSON.stringify(json));
  } catch (error) {
    console.error("Ошибка:", error)
  }
};

const RegistrationScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [university, setUniversity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.wrapper}>
      <SmallLogo title="Privet, let's get started!" gap={24} />

      <View style={styles.bottomGroup}>
        <View style={styles.inputFields}>
          <RegInput placeholder='Full Name'/>
          <RegInput placeholder='University' setProperty={setUniversity}/>
          <RegInput placeholder='E-mail' wrong={false} wrongMsg="Invalid E-Mail" setProperty={setEmail}/>
          <RegInput placeholder='Password' wrong={false} wrongMsg="Invaild password: not enough/no digits" setProperty={setPassword}/>
          <RegInput placeholder='Confirm Password' wrong={false} wrongMsg="Passwords don’t match"/>
          <Text style={styles.inputHints}>Password must contain small and capital letters, as well as 4 different digits</Text>
        </View>

        <View style={styles.navButtons}>
          <MainButton title='Sign Up' color={mainColor} onPress={() => {sendRegRequest(university, email, password)}} />
          <SecondaryButton title="I'm Buddy" color={buddyColor} onPress={() => {navigation.navigate("EnterCode")}} />
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