import { IArrivaList } from "../../classes/IArrivalList"
import { Pressable, View, Image, Text, StyleSheet, ScrollView } from "react-native"
import { blackColor, buddyColor, successColor, whiteColor } from "../../defaultColors"
import { useArrivalStore } from "../../storage/ArrivalStore"
import { useArrivalListStore } from "../../storage/ArrivalListStore"
import { useEffect, useState } from "react"
import { fetchArrivalsList } from "../../requests/GetArrivalsList"
import Popup from "../Popup"

export const ShowArrivalList: React.FC<{ mine: boolean, navigation: any }> = ({ mine, navigation }) => {
  const setArrivalId = useArrivalStore(state => state.setCurrentId)
  const arrivalList = useArrivalListStore(state => state.arrivalList)

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchArrivalsList(mine, setLoading, setError, setErrorMessage)
  }, [mine])

  console.log(arrivalList);

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

  const getCardColor = (buddy_amount: number) => {
    if (buddy_amount == 0) {
      return "#F2C34E"
    }
    if (buddy_amount == 2) {
      return "#3FD469"
    }
    return buddyColor
  }

  return(
    <ScrollView>
      <View style={styles.wrapper}>
      {arrivalList.map((item) => {
        return (
          <View key={item.id}>
            <Pressable onPress={() => {
              setArrivalId(item.id)
              navigation.navigate('ArrivalScreen')
            }}>
                <View style={[styles.arrivalCard, { borderColor: getCardColor(item.buddies_amount)}]}>
                  <View style={styles.arrivalHeader}>
                    <Text style={styles.arrivalTitle}>Приезд №{item.id}</Text>
                    <Image source={require("../../assets/arrival-info.png")} style={{ width: 24, height: 24 }} />
                  </View>
                  <View style={{ gap: 8 }}>
                    <Text style={styles.arrivalInfo}>Количество студентов: {item.students_amount}</Text>
                    <Text style={styles.arrivalInfo}>Дата и время: {item.arrival_date} {item.arrival_time}</Text>
                    <Text style={styles.arrivalInfo}>Место прибытия: {item.arrival_point}</Text>
                    <Text style={[styles.arrivalInfo, { fontWeight: "600" }]}>Сопровождающие: {item.buddies_amount}/2</Text>
                  </View>
                </View>
            </Pressable>
          </View>
        )
      })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    paddingTop: 0,
    backgroundColor: whiteColor,
    flex: 1,
    justifyContent: "flex-start",
    gap: 20
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
