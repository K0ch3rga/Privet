import { View, Text, StyleSheet } from "react-native";
import { whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";

const BuddyNotConfirmed: React.FC<ScreenProps> = ({ navigation }) => {
  return(
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Ваш аккаунт сопровождающего не является подтвержденным
        {'\n'}
        Свяжитесь с вашим тимлидером для подтверждения
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: whiteColor,
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 16
  }
})

export default BuddyNotConfirmed;