import { View, Text, StyleSheet, ViewBase, Image } from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import { mainColor, secondBlackColor, whiteColor } from "../../defaultColors";
import { ScreenProps } from "../../interfaces/ScreenProps";
import ScreenHeader from "../../components/ScreenHeader";

const PaymentSuccess: React.FC<ScreenProps> = ({ navigation }) => {
  return(
    <View style={styles.wrapper}>
      <View>
        <ScreenHeader>Оплата сопровождения</ScreenHeader>
      </View>
      <View>
        <Image source={require("../../assets/payment-done.png")} style={{ width: 128, height: 128 }}/>
      </View>
      <View>
        <Text style={[styles.text, { fontWeight: "400", fontSize: 32 }]}>10 000₽</Text>
        <Text style={[styles.text, { fontWeight: "500", fontSize: 24 }]}>Оплата прошла успешно</Text>
      </View>
      <View>
        <Text style={[styles.text, { fontWeight: "400", fontSize: 16 }]}>
          Теперь вы имеете доступ ко всему функционалу приложения и можете создать приезд
        </Text>
      </View>
      <MainButton title="Продолжить" color={mainColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 25,
    flex: 1,
    alignItems: "center",
    backgroundColor: whiteColor,
    gap: 33
  },
  text: {
    color: secondBlackColor,
    fontFamily: "Manrope",
    textAlign: "center"
  }
})

export default PaymentSuccess;