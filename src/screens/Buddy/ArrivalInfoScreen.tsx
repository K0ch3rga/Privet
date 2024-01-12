import { View, Text, StyleSheet, Pressable } from "react-native";
import { ScreenProps } from "../../interfaces/ScreenProps";
import MainButton from "../../components/Buttons/MainButton";
import { blackColor, buddyColor, grayColor, whiteColor } from "../../defaultColors";
import ScreenHeader from "../../components/ScreenHeader";
import { ItemTitleProfile } from "../../components/Profile/ProfileSection";

const ArrivalInfoScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return(
    <View style={styles.wrapper}>
      <ScreenHeader backButton={true} navigation={navigation}>Приезд №33</ScreenHeader>
      <View>
        <Text style={arrival.title}>Информация о приезде:</Text>
        <View style={arrival.wrapper}>
          <View>
            <ItemTitleProfile>Дата приезда</ItemTitleProfile>
            <Text style={arrival.value}>24.01.2024</Text>
          </View>
          <View>
            <ItemTitleProfile>Время приезда</ItemTitleProfile>
            <Text style={arrival.value}>12:00</Text>
          </View>
          <View>
            <ItemTitleProfile>Номер рейса</ItemTitleProfile>
            <Text style={arrival.value}>AJ3954921</Text>
          </View>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 24,
    paddingHorizontal: 25,
    gap: 36,
    backgroundColor: whiteColor
  }
})

const arrival = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
  },
  title: {
    color: "#242424",
    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 16
  }
})

export default ArrivalInfoScreen;