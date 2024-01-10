import { View, Text, StyleSheet } from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import { unpayedColor, whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";

const UnpayedScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return(
    <View style={styles.wrapper}>
      <Text style={styles.text}>Чтобы иметь возможность видеть задачи и создавать приезд, нужно оплатить услуги сопровождения</Text>
      <MainButton title="Оплатить услуги сопровождения" color={unpayedColor} onPress={() => {navigation.navigate("PaymentSuccess")}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: whiteColor,
    gap: 20
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16
  }
})

export default UnpayedScreen;