import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import * as yup from 'yup';

import MainButton from "../components/Buttons/MainButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import RegInput from '../components/RegInput';
import SmallLogo from "../components/Logos/SmallLogo";

import { mainColor, buddyColor } from "../defaultColors";

import { ScreenProps } from "../interfaces/ScreenProps";
import { UserDataProps } from "../interfaces/UserDataProps";
import { UserDataSchemas, userSchema } from "../Schemas/UserDataSchema";

import { sendRegistraionRequest } from "../requests/RegistrationRequest";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 30;


const RegistrationScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserDataProps>({university: '', email: '', password: ''});
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSend = async () => {
    await userSchema.validate(userData)
    .then(() => {
      sendRegistraionRequest(userData, setLoading, setError, setErrorMsg)
    })
    .catch(() => {
      setError(true)
      setErrorMsg("Please provide valid data")
    })
  }

  return (
    <>
      <View style={styles.wrapper}>
        <SmallLogo title="Privet, let's get started!" gap={24} />

        <View style={styles.bottomGroup}>
          <View style={styles.inputFields}>
            {/* <RegInput placeholder='Full Name' 
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                fullName: text
            })}}/> */}

            <RegInput placeholder='University' 
            validation={UserDataSchemas.university}
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                university: text
            })}}/>

            <RegInput placeholder='E-mail' 
            validation={UserDataSchemas.email}
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                email: text
            })}}/>

            <RegInput 
            placeholder='Password'
            password={true} 
            validation={UserDataSchemas.password}
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                password: text
            })}} />
            <RegInput 
              placeholder='Confirm Password' 
              password={true}
              validation={
                yup.string()
                .matches(new RegExp(userData.password), "Passwords doesn't match")
                .required("Please confrim password")}/>
            <Text style={styles.inputHints}>Password must contain small and capital letters, as well as 4 different digits</Text>
          </View>

          <View style={styles.navButtons}>
            <MainButton title='Sign Up' color={mainColor} onPress={handleSend} />
            <SecondaryButton title="I'm Buddy" color={buddyColor} onPress={() => {navigation.navigate("EnterCode")}} />
          </View>
        </View>
      </View>

      {isLoading && 
      <View style={styles.popup}>
        <View style={styles.popupWrapper}>
          <View style={styles.popupContent}>
            <Text>Loading</Text>
          </View>
        </View>
      </View>
      }

      {isError && 
      <View style={styles.popup}>
        <View style={styles.popupWrapper}>
          <View style={styles.popupContent}>
            <Text>{errorMsg}</Text>
          </View>
          <MainButton title="Close" color={mainColor} onPress={() => setError(false)} />
        </View>
      </View>
      }
    </>
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
  popup: {
    zIndex: 5,
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(169, 169, 169, 0.95)",
  },
  popupWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,    
  },
  popupContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: popupContentWidth,
    height: 300,
    paddingHorizontal: 22,
    paddingVertical: 29,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    color: "black"
  },
});

export default RegistrationScreen;