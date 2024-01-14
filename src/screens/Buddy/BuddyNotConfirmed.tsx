import { View, Text, StyleSheet, Image } from "react-native";
import { whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";

const BuddyNotConfirmed: React.FC<ScreenProps> = ({ navigation }) => {
  return(
    <View style={styles.wrapper}>
      <Image source={require('../../assets/buddy-nor-confirmed.png')} style={{ width: 128, height: 128 }} />
      <Text style={styles.text}>
        Для доступа к функционалу сопровождающего попросите вашего тимлидера
        {'\n'}
        подтвердить ваш профиль.
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
    gap: 20
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