import { View, StyleSheet, Text } from 'react-native';
import { Pressable } from 'react-native';

import BigLogoWithText from '../components/Logos/BigLogoWithText';
import MainButton from '../components/Buttons/MainButton';
import { mainColor } from '../defaultColors';
import SecondaryButton from '../components/Buttons/SecondaryButton';
import { ScreenProps } from "../interfaces/ScreenProps";


const WelcomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <BigLogoWithText />
      <View style={styles.buttonsWrapper}>
        <MainButton 
          title='Sign Up' 
          color={mainColor}
          onPress={() => {navigation.navigate("Registration")}}/>
        <SecondaryButton 
          title="Log in" 
          color={mainColor}
          onPress={() => {navigation.navigate("LogIn")}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    gap: 170,
    backgroundColor: "#FFFFFF"
  },
  buttonsWrapper: {
    alignItems: "center",
    gap: 13
  }
});

export default WelcomeScreen;
