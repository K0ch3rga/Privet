import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RegMainButton from "../../components/Buttons/RegMainButton";
import RegInput from '../../components/RegInput';
import SmallLogo from "../../components/Logos/SmallLogo";
import TextLink from "../../components/TextLink";
import { ScreenProps } from "../../interfaces/ScreenProps";
import { grayColor, mainColor, whiteColor } from "../../defaultColors";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 30;


const EnterNewPasswordScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // const logIn = async (email: string, password: string) => {
  //   const url = 'http://127.0.0.1:8000/api/v1/login/'
  //   const data = {
  //     email: email,
  //     password: password,
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //     })

  //     const json = await response.json();

  //     if (!response.ok) {
  //       setError(true)
  //       setErrorMsg(JSON.stringify(json));
  //     } else{
  //       navigation.navigate("Profile")
  //     }

  //     console.log("Успех:", JSON.stringify(json));
  //   } catch (error) {
  //     console.error("Ошибка:", error)
  //   }

  //   setLoading(false);
  // }

  return (
    <>
      <View style={styles.wrapper}>

        <SmallLogo title="Let’s recover your password!" gap={24} />

        <View style={styles.main}>
          <View style={styles.inputFields}>
            <Text style={styles.title}>Enter your new password!</Text>
            <RegInput placeholder='Password' wrong={false} wrongMsg="Invaild password: not enough/no digits" />
            <RegInput placeholder='Confirm Password' wrong={false} wrongMsg="Passwords don’t match" password={true}/>
          </View>
        </View>

        <View style={styles.navButtons}>
          <RegMainButton title='Next' color={mainColor} onPress={() => {navigation.navigate("LogIn")}} />
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
          <RegMainButton title="Close" color={mainColor} onPress={() => setError(false)} />
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
  title: {
    textAlign: "center",
    color: grayColor,
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 23
  },
  inputFields: {
    width: width,
    paddingHorizontal: 35,
    gap: 20
  },
  inputHints: {
    fontSize: 15,
    fontFamily: "Manrope",
    fontWeight: "400",
    textAlign: "center",
    marginHorizontal: 10,
    color: "#455A64"
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

export default EnterNewPasswordScreen;