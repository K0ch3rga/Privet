import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MainButton from "../components/Buttons/MainButton";
import RegInput from '../components/RegInput';
import SmallLogo from "../components/Logos/SmallLogo";
import TextLink from "../components/TextLink";
import { ScreenProps } from "../interfaces/ScreenProps";
import { mainColor, whiteColor } from "../defaultColors";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 30;


const LogInScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const logIn = async (email: string, password: string) => {
    const url = 'http://127.0.0.1:8000/api/v1/login/'
    const data = {
      email: email,
      password: password,
    }

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      const json = await response.json();

      if (!response.ok) {
        setError(true)
        setErrorMsg(JSON.stringify(json));
      } else{
        navigation.navigate("Profile")
      }

      console.log("Успех:", JSON.stringify(json));
    } catch (error) {
      console.error("Ошибка:", error)
    }

    setLoading(false);
  }

  return (
    <>
      <View style={styles.wrapper}>

        <SmallLogo title="Privet, welcome back!" gap={24} />

        <View style={styles.main}>

          <View style={styles.inputFields}>
            <RegInput placeholder='E-mail' wrong={false} wrongMsg="Invalid E-Mail" setProperty={setEmail}/>
            <RegInput placeholder='Password' wrong={false} wrongMsg="Invaild password: not enough/no digits" setProperty={setPassword} password={true}/>
          </View>

          <View>
            <TextLink onPress={() => {navigation.navigate("EnterEmail")}} style={{textAlign: "center"}}>Forget password?</TextLink>
          </View>

        </View>

        <View style={styles.navButtons}>
          <MainButton title='Log In' color={mainColor} onPress={() => {logIn(email, password)}} />
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