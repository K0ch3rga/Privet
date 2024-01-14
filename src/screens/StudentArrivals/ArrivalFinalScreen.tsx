import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import { ScreenProps } from "../../interfaces/ScreenProps";
import { grayColor, mainColor, secondBlackColor, whiteColor } from "../../defaultColors";
import MainButton from "../../components/Buttons/MainButton";
import { useAccountStore } from "../../storage/AccountStore";
import { useState } from "react";

const ArrivalFinalScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const setArrivalExist = useAccountStore(state => state.setArrivalExist)
  const [isProfileEdit, setProfileEdit] = useState(false);

  return(
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PRIVET</Text>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.confirmMessage}>Ваш приезд был успешно{'\n'}отправлен!</Text>
      </View>
      <View>
        <Image source={require('../../assets/arrival-confirm.png')} style={{ width: 128, height: 128}} />
      </View>
      <View style={{ gap: 10, alignItems: "center"}}>
        <Text style={styles.hint}>
          Также предлагаем вам заполнить 
          {"\n"}
          дополнительную информацию в профиле о вас.
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <MainButton 
          title="Перейти к списку задач"
          color={mainColor}
          onPress={() => {
            setArrivalExist(true)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 25,
    gap: 33,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor
  },
  header: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },
  headerTitle: {
    color: grayColor,
    fontFamily: "Jua",
    fontSize: 60,
    fontWeight: "400"
  },
  logo: {
    width: 60,
    height: 60
  },
  confirmMessage: {
    color: secondBlackColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontSize: 24, 
    fontWeight: "600"
  },
  hint: {
    color: secondBlackColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "400"
  }
})

export default ArrivalFinalScreen;