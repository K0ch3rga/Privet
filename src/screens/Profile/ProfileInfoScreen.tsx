import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import RegInput from "../../components/RegInput";
import Select from "../../components/Select";
import MainButton from "../../components/Buttons/MainButton";
import { grayColor, mainColor, whiteColor } from "../../defaultColors";
import { sendChangeProfileInfoRequest } from "../../requests/ChangeProfileInfoRequest";
import Popup from "../../components/Popup";
import { IUser } from "../../classes/IUser";

const counties = ['Russia', 'China', 'Korea'];
const genders = ["male", "female"];
const languages = ["Russian","English",'Chinese'];

const getValue = (value: string | undefined) => {
  return value ? value : "—"
}

const getDateValue = (value: string | undefined) => {
  if (!value) {
    return "—"
  }
  const options = {year: 'numeric', month: 'numeric', day: 'numeric'} as any;
  const date = new Date(value);
  if (!date) {
    return "—"
  }
  return date.toLocaleDateString("ru-RU", options)
}

const ProfileInfoScreen: React.FC = () => {
  const [constactsActive, setConstactsActive] = useState(false);
  const [userData, setUserData] = useState<IUser>({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [otherLangsActive, setOtherLangsActive] = useState(false);
  const user_id = 5;
  const url = `http://127.0.0.1:8000/api/v1/student/profile/${user_id}/`;

  const handleSend = () => {
    if (userData) {
      sendChangeProfileInfoRequest(5, userData, setLoading, setError, setErrorMessage);
    }
    else{
      setErrorMessage("User Data is empty")
      setError(true)
    }
  }

  useEffect(() => {
    setLoading(true)
    
    const fetchUserInfo = () => {
      try {
        fetch(url)
        .then((responce) => {
          return responce.json()
        })
        .then((json) => {
          const user = json as IUser
          setUserData(user);
        })
        .finally(() => {
          setLoading(false)
        });
      }
      catch (error) {
        console.error("Ошибка: ", error)
        setLoading(false)
      }
    }
    fetchUserInfo();
  }, [])

  if (isLoading) {
    return (
      <Popup>
        <Text>Loading...</Text>
      </Popup>
    )
  }
  
  if (userData) {
    return (
      <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View>
            <Image source={require("../../assets/default-profile-pic.png")} style={styles.profilePic} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userData.user?.user_info?.full_name}</Text>
            <Text style={styles.otherInfo}>{userData.citizenship}</Text>
            <Text style={styles.otherInfo}>UrFU</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.navButton}>
            <Image source={require('../../assets/profile/edit.png')} style={styles.icon} />
          </View>
          <View style={styles.navButton}>
            <Image source={require('../../assets/profile/settings.png')} style={styles.icon} />
          </View>
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Контакты</Text>
          </View>
          <View style={styles.sectionInfo}>
            <View>
              <Text style={styles.itemTitle}>Email</Text>
              <Text style={styles.itemValue}>{userData.user?.email}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Телефон</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.phone)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>WhatsApp</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.whatsapp)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>ВКонтакте</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.vk)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Telegram</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.telegram)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Информация о студенте</Text>
          </View>
          <View style={styles.sectionInfo}>
            <View>
              <Text style={styles.itemTitle}>Пол</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.sex)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата рождения</Text>
              <Text style={styles.itemValue}>{getDateValue(userData.user?.user_info?.birth_date)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Родной язык</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.native_language)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Другие языки</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.other_languages_and_levels)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Институт</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.institute)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Направление обучения</Text>
              <Text style={styles.itemValue}>{getValue(userData.user?.study_program)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>{getDateValue(userData.user?.last_visa_expiration)}</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
            <View>
              <Text style={styles.itemTitle}>Дата окончания последней визы</Text>
              <Text style={styles.itemValue}>13.12.2025</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 19,
    paddingVertical: 24,
    backgroundColor: whiteColor,
    flex: 1,
    gap: 28
  },
  header: {
    borderWidth: 4,
    borderColor: mainColor,
    borderRadius: 30,
    padding: 15,
    flexDirection: "row",
    gap: 10
  },
  profilePic: {
    width: 102,
    height: 102,
    borderColor: "#B0B0B0",
    borderWidth: 2,
    borderRadius: 20
  },
  profileInfo: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    flex: 1,
  },
  name: {
    color: grayColor,
    fontFamily: "LilitaOne",
    fontSize: 32,
    fontWeight: "400",
  },
  otherInfo: {
    color: grayColor,
    fontFamily: "LilitaOne",
    fontSize: 16,
    fontWeight: "400",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch"
  },
  navButton: {
    backgroundColor: mainColor,
    borderRadius: 20,
    padding: 10
  },
  icon: {
    width: 20,
    height: 20
  },
  sectionWrapper: {
    backgroundColor: "#F7F7F7",
    borderRadius: 30,
    gap: 10
  },
  sectionHeader: {
    backgroundColor: mainColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    minWidth: 125,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center"
  },
  sectionTitle: {
    alignSelf: "center",
    color: "#262626",
    fontFamily: "LilitaOne",
    fontSize: 25
  },
  sectionInfo: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    gap: 10
  },
  itemTitle: {
    color: grayColor,
    fontFamily: "Manrope-Regular",
    fontSize: 14,
  },
  itemValue: {
    color: "#000",
    fontFamily: "Manrope-Regular",
    fontSize: 16,
  }
});

export default ProfileInfoScreen;
