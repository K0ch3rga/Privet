import { ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native"
import { grayColor, mainColor, textColor, whiteColor } from "../../defaultColors";
import { useEffect, useState } from "react";
import { number } from "yup";
import { useAccountStore } from "../../storage/AccountStore";
import { fetchMyStudentsList } from "../../requests/GetMyStudens";
import Popup from "../../components/Popup";
import { ScreenProps } from "../../interfaces/ScreenProps";

export interface MyStudent {
  arrival_id: number,
  student_full_name: string,
  citizenship: string,
  student_id: number
}

const MyStudentsList: React.FC<ScreenProps> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [studentsList, setStudentsList] = useState<MyStudent[]>([]);
  const user_id = useAccountStore.getState().user_id

  useEffect(() => {
    fetchMyStudentsList(user_id, setStudentsList, setLoading, setError, setErrorMessage)
  }, [])

  if (isLoading) {
    return(
      <Popup>
        <Text>Loading</Text>
      </Popup>
    )
  }

  if (error) {
    return(
      <Popup close={setError}>
        <Text>{errorMessage}</Text>
      </Popup>
    )
  }

  return(
    <View style={styles.wrapper}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Мои студенты</Text>
        </View>
        <View style={students.wrapper}>
          {studentsList.map((item) => {
            return(
              <Pressable onPress={() => navigation.navigate("Chats")}>
                <View style={students.card}>
                  <Image source={require("../../assets/default-profile-pic.png")} style={students.picture} />
                  <View style={students.main}>
                    <View style={{ justifyContent: "center" }}>
                      <Text style={students.name}>{item.student_full_name}</Text>
                      <Text style={students.info}>{item.citizenship}</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      <Text style={[students.info, { color: "rgba(37, 37, 37, 0.49)" }]}>Приезд №{item.arrival_id}</Text>
                    </View>
                  </View>
                  <Image source={require("../../assets/chat-profile.png")} style={{ width: 24, height: 24 }} />
                </View>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: whiteColor,
    padding: 30
  },
  header: {
    color: textColor,
    fontFamily: "Manrope",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 40
  }
})

const students = StyleSheet.create({
  wrapper: {
    gap: 10
  },
  card: {
    padding: 16,
    paddingRight: 24,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",

    borderRadius: 10,
    borderWidth: 3,
    borderColor: grayColor
  },
  picture: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: mainColor
  },
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20
  },
  name: {
    color: "#252525",
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
  },
  info: {
    color: "rgba(37, 37, 37, 0.70)",
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default MyStudentsList;