import { View, StyleSheet, Text } from 'react-native';
import BigLogoWithText from '../../components/Logos/BigLogoWithText';
import RegMainButton from '../../components/Buttons/RegMainButton';
import { mainColor } from '../../defaultColors';
import RegSecondaryButton from '../../components/Buttons/RegSecondaryButton';
import { ScreenProps } from "../../interfaces/ScreenProps";


const WelcomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <BigLogoWithText />
      <View style={styles.buttonsWrapper}>
        <RegMainButton 
          title='Sign Up' 
          color={mainColor}
          onPress={() => {navigation.navigate("Registration")}}/>
        <RegSecondaryButton 
          title="Log in" 
          color={mainColor}
          onPress={() => {navigation.navigate("LogIn")}} />
      </View>
    </View>
  )
}

export default WelcomeScreen

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
    gap: 13,
  },
})

