import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MainButton from "../components/Buttons/MainButton";
import RegInput from '../components/RegInput';
import SmallLogo from "../components/Logos/SmallLogo";
import TextLink from "../components/TextLink";
import { ScreenProps } from "../interfaces/ScreenProps";
import { mainColor, whiteColor } from "../defaultColors";
import { loginProps } from "../requests/LoginRequest";
import { sendLoginRequest } from "../requests/LoginRequest";
import { UserDataSchemas } from "../Schemas/UserDataSchema";
import * as yup from 'yup';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 30;


const LoginDataShemas = {
  email: UserDataSchemas.email,
  password: yup.string().required("Please enter the password")
}


const LogInScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSend = async () => {
    const data = {
      email: email,
      password: password
    } as loginProps

    await yup.object(LoginDataShemas).validate(data)
      .then(() => {
        sendLoginRequest(data, setLoading, setError, setErrorMsg)
      })
      .catch(() => {
        setError(true)
        setErrorMsg("Please provide valid data")
      })
  }

  return (
    <>
      <View style={styles.wrapper}>

        <SmallLogo title="Privet, welcome back!" gap={24} />

        <View style={styles.main}>

          <View style={styles.inputFields}>
            <RegInput placeholder='E-mail' 
              setProperty={setEmail}
              validation={LoginDataShemas.email}
            />

            <RegInput 
              placeholder='Password' 
              setProperty={setPassword} 
              password={true}
              validation={LoginDataShemas.password}/>
          </View>

          <View>
            <TextLink onPress={() => {navigation.navigate("EnterEmail")}} style={{textAlign: "center"}}>Forget password?</TextLink>
          </View>

        </View>

        <View style={styles.navButtons}>
          <MainButton title='Log In' color={mainColor} onPress={handleSend} />
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
    alignItems: "center",
    gap: 100,
    padding: 35,
    paddingTop: 33,
    backgroundColor: whiteColor
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24
  },
  inputFields: {
    width: width,
    paddingHorizontal: 35,
    gap: 20
  },
  navButtons: {
    position: "fixed",
    bottom: 35
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

export default LogInScreen;