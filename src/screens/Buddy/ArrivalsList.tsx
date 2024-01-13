import { View, Text, StyleSheet, FlatList, Pressable, Image, ScrollView } from "react-native";
import { ScreenProps } from "../../interfaces/ScreenProps";
import { blackColor, buddyColor, secondaryColor, whiteColor } from "../../defaultColors";
import { useEffect, useState } from "react";
import { fetchArrivalsList } from "../../requests/GetArrivalsList";
import Popup from "../../components/Popup";
import { useArrivalListStore } from "../../storage/ArrivalListStore";
import { ShowArrivalList } from "../../components/Arrivals/ShowArrivalsList";

const ArrivalsList: React.FC<ScreenProps> = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [mineActive, setMineActive] = useState(true);


  if (isLoading) {
    return (
      <Popup>
        <Text>Loading...</Text>
      </Popup>
    )
  }

  if (error) {
    return (
      <Popup close={setError}>
        <Text>{errorMessage}</Text>
      </Popup>
    )
  }

  return(
    <>
        <View style={styles.wrapper}>
          <View style={styles.arrivalToggle}>
            <Pressable onPress={() => {setMineActive(!mineActive)}}>
              {
                mineActive 
                  ? <Image source={require("../../assets/arrival-toggle-on.png")} style={styles.arrivalToggleIcon} />
                  : <Image source={require("../../assets/arrival-toggle-off.png")} style={styles.arrivalToggleIcon} />
              }
            </Pressable>
            <Text style={styles.myArrivals}>Мои приезды</Text>
          </View>
        </View>
        <ShowArrivalList mine={mineActive} navigation={navigation}/>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    backgroundColor: whiteColor,
    paddingBottom: 20,
  },
  arrivalToggle: {
    flexDirection: "row",
    gap: 10
  },
  arrivalToggleIcon: {
    width: 47,
    height: 23
  },
  myArrivals: {
    color: blackColor,
    fontFamily: "Manrope",
    fontWeight: "600",
    fontSize: 16
  },
  arrivalCard: {
    padding: 24,
    borderWidth: 5,
    borderColor: buddyColor,
    borderRadius: 30,
    gap: 16
  },
  arrivalHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  arrivalTitle: {
    color: blackColor,
    fontFamily: "Manrope",
    fontWeight: "500",
    fontSize: 20
  },
  arrivalInfo: {
    color: blackColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 15
  },
})

export default ArrivalsList;