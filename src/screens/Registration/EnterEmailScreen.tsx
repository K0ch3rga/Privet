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


const EnterEmailScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <View style={styles.wrapper}>

        <SmallLogo title="Let’s recover your password!" gap={24} />

        <View style={styles.main}>
          <View style={styles.inputFields}>
            <Text style={styles.title}>Enter your email!</Text>
            <RegInput placeholder='E-mail' setProperty={setEmail}/>
          </View>
        </View>

        <View>
          <RegMainButton title='Next' color={mainColor} onPress={() => {navigation.navigate("EnterNewPassword")}} />
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
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
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

export default EnterEmailScreen;