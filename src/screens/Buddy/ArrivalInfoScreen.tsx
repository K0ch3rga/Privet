import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { ScreenProps } from "../../interfaces/ScreenProps";
import MainButton from "../../components/Buttons/MainButton";
import { blackColor, buddyColor, grayColor, mainColor, successColor, teamLeadColor, textColor, whiteColor } from "../../defaultColors";
import ScreenHeader from "../../components/ScreenHeader";
import { HeaderProfileSection, InfoProfileSection, ItemTitleProfile, SectionProfile } from "../../components/Profile/ProfileSection";
import { useEffect, useState } from "react";
import Popup from "../../components/Popup";
import { useArrivalStore } from "../../storage/ArrivalStore";
import { fetchArrivalData } from "../../requests/GetArrivalData";
import { IArrival } from "../../classes/IArrival";
import { sendRequestArrival } from "../../requests/RequestArrival";
import { getPageColor, useAccountStore } from "../../storage/AccountStore";
import { sendConfirmArrival } from "../../requests/ConfirmArrival";

const pageColor = getPageColor();

const ArrivalInfoScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [isRequestConfirm, setRequestConfirm] = useState(false)
  const [isArrivalConfirm, setArrivalConfirm] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const arrivalId = useArrivalStore.getState().currentId
  const [arrivalData, setArrivalData] = useState<IArrival>({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isTeamLead = useAccountStore(state => state.isLeader)

  useEffect(() => {
    fetchArrivalData(arrivalId, setArrivalData, setLoading, setError, setErrorMessage);
  }, [])

  const handleRequestArrival = () => {
    sendRequestArrival(arrivalId, setLoading, setRequestConfirm, setError, setErrorMessage);
  }

  const handleConfirmArrival = () => {
    sendConfirmArrival(arrivalId, setLoading, setArrivalConfirm, setError, setErrorMessage);
  }

  const BuddyButtons: React.FC<{length: number}> = ({length}) => {
    return (
      length >= 2
        ? <View style={button.inactiveButton}><Text style={button.title}>Записаться на этот приезд</Text></View>
        : <MainButton color={buddyColor} title="Записаться на этот приезд" onPress={handleRequestArrival} />
    )
  }

  const TeamLeadButtons = () => {
    return(
      <>
        <Pressable 
          style={button.buttonTeamlead}
          onPress={handleRequestArrival}
        >
          <Text style={[button.title, { color: textColor }]}>Записаться на этот приезд</Text>
        </Pressable>
        {/* <MainButton color={teamLeadColor} title="Редактировать сопровождающих" /> */}
        <MainButton color={"#00EC6D"} title="Утвердить приезд" onPress={handleConfirmArrival}/>
      </>
    )
  }
  
  console.log(arrivalData);
  
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

  if (isRequestConfirm) {
    return(
      <Popup>
        <View style={confirmPopup.wrapper}>
          <Text style={confirmPopup.text}>Вы успешно записались на этот приезд!{'\n'}Ожидайте подтверждения тимлидером.</Text>
          <Image source={require("../../assets/arrival-request-confirmed.png")} style={{ width: 64, height: 64}}/>
          <MainButton color={buddyColor} title="Вернуться к приездам" onPress={() => navigation.goBack()}/>
        </View>
      </Popup>
    )
  }

  if (isArrivalConfirm) {
    return(
      <Popup>
        <View style={confirmPopup.wrapper}>
          <Text style={confirmPopup.text}>Приезд подтверждён</Text>
          <MainButton color={teamLeadColor} title="Вернуться к приездам" onPress={() => navigation.goBack()}/>
        </View>
      </Popup>
    )
  }

  return(
    <ScrollView>
      <View style={styles.wrapper}>
        <ScreenHeader backButton={true} navigation={navigation}>Информация о приезде</ScreenHeader>
        <SectionProfile>
          <HeaderProfileSection>Прибытие</HeaderProfileSection>
          <InfoProfileSection>
            <View>
              <ItemTitleProfile>Дата приезда</ItemTitleProfile>
              <Text style={arrival.value}>{arrivalData.arrival_date}</Text>
            </View>
            <View>
              <ItemTitleProfile>Время приезда</ItemTitleProfile>
              <Text style={arrival.value}>{arrivalData.arrival_time}</Text>
            </View>
            <View>
              <ItemTitleProfile>Номер рейса</ItemTitleProfile>
              <Text style={arrival.value}>{arrivalData.flight_number}</Text>
            </View>
            <View>
              <ItemTitleProfile>Пункт прибытия</ItemTitleProfile>
              <Text style={arrival.value}>{arrivalData.arrival_point}</Text>
            </View>
            <View>
              <ItemTitleProfile>Комментарий</ItemTitleProfile>
              <Text style={arrival.value}>{arrivalData.comment}</Text>
            </View>
            <View>
              <ItemTitleProfile>Билеты</ItemTitleProfile>
              <View style={{ gap: 14}}>
                <Text style={[arrival.value, arrival.files]}>213317356.pdf</Text>
                <Text style={[arrival.value, arrival.files]}>213317357.pdf</Text>
                <Text style={[arrival.value, arrival.files]}>213317358.pdf</Text>
                <Text style={[arrival.value, arrival.files]}>213317359.pdf</Text>
              </View>
            </View>
          </InfoProfileSection>
        </SectionProfile>
        <View style={section.wrapper}>
          <View style={section.header}>
            <View style={[section.left, { backgroundColor: mainColor }]}>
              <Text style={section.text}>Студенты</Text>
            </View>
            <View style={[section.right, { backgroundColor: mainColor }]}> 
              <Text style={section.text}>{arrivalData.students?.length}</Text>
            </View>
          </View>
          <View style={card.wrapper}> 
            {arrivalData.students?.map((item) => {
              return(
                <Pressable onPress={() => {
                  useAccountStore.setState({ buddyStudentId: item.id })
                  navigation.navigate("StudentProfile")
                }}>
                  <View style={students.card}>
                    <Image source={require("../../assets/default-profile-pic.png")} style={students.picture} />
                    <View style={{flex: 1}}> 
                      <Text style={styles.name}>{item.user?.user_info?.full_name}</Text>
                    </View>
                    <Image source={require("../../assets/profile-icon.png")} style={{ width: 24, height: 24 }} />
                  </View>
                </Pressable>
              )
            })}
          </View>
        </View>
        <View style={section.wrapper}>
          <View style={section.header}>
            <View style={section.left}>
              <Text style={section.text}>Сопровождающие</Text>
            </View>
            <View style={section.right}> 
              <Text style={section.text}>{arrivalData.buddy_id?.length}</Text>
            </View>
          </View>
          <View style={card.wrapper}> 
            {arrivalData.buddy_full_names?.map((item) => {
              return(
                <View style={buddies.card}>
                  <Image source={require("../../assets/default-profile-pic.png")} style={students.picture} />
                  <View style={{flex: 1}}> 
                    <Text style={styles.name}>{item}</Text>
                  </View>
                  <Image source={require("../../assets/profile-icon.png")} style={{ width: 24, height: 24 }} />
                </View>
              )
            })}
          </View>
        </View>
        { arrivalData.buddy_id &&
          <View style={{ gap: 10 }}>
            
            {isTeamLead 
              ? <TeamLeadButtons />
              : <BuddyButtons length={arrivalData.buddy_id.length} />
            }
          </View>
        }
      </View>
    </ScrollView>
  )
}

const confirmPopup = StyleSheet.create({
  wrapper: {
    gap: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: textColor,
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 16
  }
})

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 25,
    paddingHorizontal: 24,
    gap: 36,
    backgroundColor: whiteColor
  },
  picture: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: 100,
  },
  name: {
    color: textColor,
    fontFamily: "Manrope",
    fontWeight: "600",
    fontSize: 16
  },
})

const arrival = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
  },
  value: {
    color: "#000",
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16
  },
  files: {
    textDecorationLine: "underline"
  }
})

const section = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
    gap: 16,
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  left: {
    backgroundColor: buddyColor,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  right: {
    backgroundColor: buddyColor,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    color: textColor,
    textAlign: "center",
    fontFamily: "LilitaOne",
    fontWeight: "400",
    fontSize: 25
  }
})

const card = StyleSheet.create({
  card: {
    padding: 16,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
  },
  wrapper: {
    paddingHorizontal: 24,
    gap: 20
  }
})

const students = StyleSheet.create({
  card: {
    ...card.card,
    borderColor: grayColor
  },
  picture: {
    ...styles.picture,
    borderColor: grayColor
  }
})

const buddies = StyleSheet.create({
  card: {
    ...card.card,
    borderColor: buddyColor
  },
  picture: {
    ...styles.picture,
    borderColor: buddyColor
  }
})

const button = StyleSheet.create({
  inactiveButton: {
    padding: 10,
    borderRadius: 30,
    minWidth: "100%",
    backgroundColor: 'rgba(38, 38, 38, 0.20)'
  },
  buttonTeamlead: {
    padding: 10,
    borderRadius: 30,
    minWidth: "100%",
    backgroundColor: whiteColor,
    borderWidth: 3,
    borderColor: buddyColor
  },
  title: {
    color: "rgba(38, 38, 38, 0.50)",
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 20
  }
})

export default ArrivalInfoScreen;