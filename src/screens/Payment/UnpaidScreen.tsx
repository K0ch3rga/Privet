import { View, Text, StyleSheet, Image } from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import { mainColor, unpayedColor, whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";

const UnpaidScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return(
    <View style={styles.wrapper}>
      <View style={{ justifyContent: "center",
    alignItems: "center", }}>
        <Image source={require("../../assets/warning.png")} style={{ width: 128, height: 128 }} />
        <Text style={styles.text}>
          Чтобы иметь доступ к задачам и созданию приезда, нужно внести 
          {"\n"}
          оплату за услуги сопровождения.
        </Text>
      </View>
      <MainButton 
        title="Оплатить услуги сопровождения" 
        color={mainColor} 
        onPress={() => {navigation.navigate("PaymentSuccess")}}
      />
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

export default UnpaidScreen;