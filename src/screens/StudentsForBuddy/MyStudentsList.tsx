import { ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native"
import { blackColor, buddyColor, grayColor, mainColor, teamLeadColor, textColor, whiteColor } from "../../defaultColors";
import { useEffect, useState } from "react";
import { useAccountStore } from "../../storage/AccountStore";
import { fetchMyStudentsList } from "../../requests/GetMyStudens";
import Popup from "../../components/Popup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamleadBuddyProfile from "../TeamLead/TeamleadBuddyProfile";
import BuddyStudentProfileScreen from "../Buddy/BuddyStudentProfileScreen";
import ChatScreen from "../Chat";
import { fetchWaitingBuddysList } from "../../requests/fetchWaitingList";
import RegMainButton from "../../components/Buttons/RegMainButton";
import { sendConfirmBuddyStatus } from "../../requests/ConfirmBuddyStatus";
import MainButton from "../../components/Buttons/MainButton";

export interface IMyStudent {
  arrival_id: number,
  student_full_name: string,
  citizenship: string,
  student_id: number
}

export interface IWaitingBuddy {
  user: {
      id: number,
      user_info: {
        full_name: string
      }
  }
}

const MyStudentListHeader: React.FC<{ count: number }> = ({ count }) => {
  return(
    <View style={styles.headerWrapper}>
      <Text style={styles.header}>Мои студенты</Text>
      <Text style={styles.count}>Всего: {count}</Text>
    </View>
  )
} 

const WaitingBuddyHeader: React.FC<{ count: number }> = ({ count }) => {
  return(
    <View style={styles.headerWrapper}>
      <View style={{ gap: 8 }}>
        <View>
          <Text style={styles.header}>Сопрвождающие</Text>
          <Text style={styles.header2}>ожидающие подтверждения</Text>
        </View>
        <Text style={styles.count}>Всего: {count}</Text>
      </View>
    </View>
  )
} 

const ShowMyStudentsList: React.FC<{ studentsList: IMyStudent[], navigation: any }> = ({ studentsList, navigation }) => {
  return (
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
  )
} 

const ShowBuddysList: React.FC<{ 
  buddiesList: IWaitingBuddy[], 
  navigation: any, 
  confirmBuddy: (id: number) => void }> = ({ buddiesList, navigation, confirmBuddy }) => {

  return(
    <View style={buddy.wrapper}>
      <Pressable onPress={() => {
        useAccountStore.setState({ teamleadBuddyId: 79 })
        navigation.navigate("BuddyProfile")
      }}>
        <View style={buddy.card}>
            <Image source={require("../../assets/default-profile-pic.png")} style={buddy.picture} />
            <View style={buddy.main}>
              <View style={{ justifyContent: "center" }}>
                <Text style={buddy.name}>Михаил Черемисин</Text>
              </View>
              <Pressable 
                style={{padding: 15}}
                onPress={() => {console.log("confirmBuddy(id)")}}
              >
                <Image source={require("../../assets/confirm-buddy.png")} style={{ width: 24, height: 24 }} />
              </Pressable>
            </View>
        </View>
      </Pressable>
      {buddiesList.map((item) => {
        if (!!item.user.user_info) {
          return(
            <Pressable onPress={() => {
              useAccountStore.setState({ teamleadBuddyId: item.user.id })
              navigation.navigate("BuddyProfile")
            }}>
              <View style={buddy.card}>
                  <Image source={require("../../assets/default-profile-pic.png")} style={buddy.picture} />
                  <View style={buddy.main}>
                    <View style={{ justifyContent: "center" }}>
                      <Text style={buddy.name}>{item.user.user_info.full_name}</Text>
                    </View>
                    <Pressable 
                      style={{padding: 15}}
                      onPress={() => {confirmBuddy(item.user.id)}}
                    >
                      <Image source={require("../../assets/confirm-buddy.png")} style={{ width: 24, height: 24 }} />
                    </Pressable>
                  </View>
              </View>
            </Pressable>
          )
        }
      })}
    </View>
  )
}

const MyStudentsList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [studentsList, setStudentsList] = useState<IMyStudent[]>([]);
  const [buddysList, setBuddysList] = useState<IWaitingBuddy[]>([]);
  const user_id = useAccountStore.getState().user_id
  const isTeamLead = useAccountStore(state => state.isLeader)
  const [isBuddyListActive, setBuddyListActive] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  console.log(buddysList);
  

  useEffect(() => {
    fetchMyStudentsList(user_id, setStudentsList, setLoading, setError, setErrorMessage)
    if (isTeamLead) {
      fetchWaitingBuddysList(setBuddysList, setError, setErrorMessage, setLoading)
    }
  }, [])

  const handleConfirmBuddy = (buddyId: number) => {
    sendConfirmBuddyStatus(buddyId, setSuccess, setLoading, setError, setErrorMessage)
  }

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

  if (isSuccess) {
    return (
      <Popup>
        <Text>Статус сопровождающего подтверждён</Text>
        <MainButton title="Закрыть" color={teamLeadColor} onPress={() => {
          setSuccess(false)
          fetchWaitingBuddysList(setBuddysList, setError, setErrorMessage, setLoading)
        }}/>
      </Popup>
    )
  }

  const Students = () => {
    return (
      <>
        <MyStudentListHeader count={studentsList.length} />
        <View style={control.wrapper}>
          <View style={control.active}>
            <Text style={control.activeText}>Студенты</Text>
          </View>
          <Pressable onPress={() => setBuddyListActive(true)} style={control.inactive}>
            <View>
              <Text style={control.inactiveText}>Сопрвождающие</Text>
            </View>
          </Pressable>
        </View>
        <ShowMyStudentsList studentsList={studentsList} navigation={navigation} />
      </>
    )
  }

  const Buddies = () => {
    return (
      <>
        <WaitingBuddyHeader count={buddysList.length} />
        <View style={control.wrapper}>
          <Pressable onPress={() => setBuddyListActive(false)} style={control.inactive}>
            <View>
              <Text style={control.inactiveText}>Студенты</Text>
            </View>
          </Pressable>
          <View style={control.active}>
            <Text style={control.activeText}>Сопрвождающие</Text>
          </View>
        </View>
        <ShowBuddysList navigation={navigation} buddiesList={buddysList} confirmBuddy={handleConfirmBuddy}/>
      </>
    )
  }

  if (isTeamLead) {
    const TeamLeadScreen = () => {
      return(
        <View style={styles.wrapper}>
          <ScrollView>
            {isBuddyListActive ? <Buddies /> : <Students />}
            
            
          </ScrollView>
        </View>
      )
    }
    
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator initialRouteName="TeamLeadScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="TeamLeadScreen" component={TeamLeadScreen} />
        <Stack.Screen name="BuddyProfile" component={TeamleadBuddyProfile} />
        <Stack.Screen name="StudentProfile" component={BuddyStudentProfileScreen} />
        {/* @ts-ignore */}
        <Stack.Screen name="Chats" component={ChatScreen} />
      </Stack.Navigator>
    )
    
  }

  return(
    <View style={styles.wrapper}>
      <ScrollView>
        <MyStudentListHeader count={studentsList.length}/>
        <ShowMyStudentsList studentsList={studentsList} navigation={navigation} />
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
  headerWrapper: {
    marginBottom: 40,
    alignItems: "center"
  },
  header: {
    color: textColor,
    fontFamily: "Manrope",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
  },
  header2: {
    color: textColor,
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  count: {
    color: textColor,
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
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

const buddy = StyleSheet.create({
  wrapper: {
    gap: 10
  },
  card: {
    padding: 16,
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
    borderColor: buddyColor
  },
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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

const control = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    backgroundColor: "rgba(181, 124, 255, 0.30)",
    flexDirection: "row",
    marginBottom: 10
  },
  active: {
    borderRadius: 20,
    backgroundColor: teamLeadColor,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inactive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  activeText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "700",
  },
  inactiveText: {
    color: blackColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "700",
  }
})

export default MyStudentsList;