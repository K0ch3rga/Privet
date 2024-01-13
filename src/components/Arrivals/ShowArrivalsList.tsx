import { IArrivaList } from "../../classes/IArrivalList"
import { Pressable, View, Image, Text, StyleSheet } from "react-native"
import { blackColor, buddyColor } from "../../defaultColors"
import { useArrivalStore } from "../../storage/ArrivalStore"

export const ShowArrivalList: React.FC<{ arrivalList: IArrivaList[], navigation: any }> = ({ arrivalList, navigation }) => {
  const setCurrentId = useArrivalStore(state => state.setCurrentId)

  return (
    <View>
      <Pressable onPress={() => {
        navigation.navigate('ArrivalScreen')
      }}>
          <View style={styles.arrivalCard}>
            <View style={styles.arrivalHeader}>
              <Text style={styles.arrivalTitle}>Приезд №</Text>
              <Image source={require("../../assets/arrival-info.png")} style={{ width: 24, height: 24 }} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.arrivalInfo}>Имена студентов:</Text>
              <Text style={styles.arrivalInfo}>Дата приезда: </Text>
              <Text style={styles.arrivalInfo}>Страны студентов: </Text>
              <Text style={[styles.arrivalInfo, { fontWeight: "600" }]}>Сопровождающие:/2</Text>
            </View>
          </View>
      </Pressable>
    </View>
  )


  return(
    <>
      {arrivalList.map((item) => {
        return (
          <View key={item.id}>
            <Pressable onPress={() => {
              setCurrentId(item.id)
              navigation.navigate('ArrivalScreen')
            }}>
                <View style={styles.arrivalCard}>
                  <View style={styles.arrivalHeader}>
                    <Text style={styles.arrivalTitle}>Приезд №{item.id}</Text>
                    <Image source={require("../../assets/arrival-info.png")} style={{ width: 24, height: 24 }} />
                  </View>
                  <View style={{ gap: 8 }}>
                    <Text style={styles.arrivalInfo}>Имена студентов: {item.group_full_names}</Text>
                    <Text style={styles.arrivalInfo}>Дата приезда: {item.arrival_date}</Text>
                    <Text style={styles.arrivalInfo}>Страны студентов: {item.group_countries}</Text>
                    <Text style={[styles.arrivalInfo, { fontWeight: "600" }]}>Сопровождающие: {item.buddies_amount}/2</Text>
                  </View>
                </View>
            </Pressable>
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
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
