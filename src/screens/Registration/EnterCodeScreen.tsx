import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ColorValue } from 'react-native';
import SmallLogo from "../../components/Logos/SmallLogo";
import RegMainButton from "../../components/Buttons/RegMainButton";
import { mainColor, secondaryColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";
import TextLink from "../../components/TextLink";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 30;

const EnterCodeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [popupActive, setPopupActive] = useState(false);
  
  return (
    <>
      <View style={styles.wrapper}>
          <SmallLogo title="Good job! Your code is on its way" gap={24} />
          <View style={styles.codeWrapper}>
            <Text style={styles.codeTitle}>Enter your code</Text>
            <TextInput style={styles.codeInput} defaultValue="1234"></TextInput>
            <TextLink onPress={() => setPopupActive(true)}>Didn’t receive an email?</TextLink>
          </View>
        
        <View style={styles.bottom}>
          <RegMainButton 
            title="Next" 
            color={mainColor} 
            onPress={() => {navigation.navigate("Profile")}}
            />
        </View>
      </View>

      {popupActive && 
      <View style={styles.popup}>
        <View style={styles.popupWrapper}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Didn’t receive an email?</Text>
            <View style={styles.popupButtons}>
              <RegMainButton color={mainColor} title="Send code again" onPress={() => setPopupActive(false)}/>
              <RegMainButton color={secondaryColor} title="Contact support"/>
            </View>
          </View>
        </View>
      </View>}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 45,
    paddingVertical: 35,
    gap: 80
  },
  codeWrapper: {
    alignItems: "center",
    gap: 9
  },
  codeInput: {
    borderColor: mainColor,
    height: 80,
    width: 290,
    borderWidth: 4, 
    borderRadius: 10,
    paddingLeft: 20,

    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 43,
    letterSpacing: 43,
  },
  codeTitle: {
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 23
  },
  bottom: {
    position: "absolute",
    bottom: 50
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
    gap: 40
  },
  popupTitle: {
    fontFamily: "Manrope",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 25,
  },
  popupButtons: {
    gap: 10
  },
  orangeButton: {
    borderColor: "#FF8469",
    borderWidth: 1,
    backgroundColor: "white"
  },
  orangeButtonText: {
    color: "#FF8469",
  }
});

export default EnterCodeScreen;