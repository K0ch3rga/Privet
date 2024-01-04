import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { ProfileItemTitle, ProfileSection, ProfileSectionHeader, ProfileSectionInfo, ProfileSectionTitle } from "./ProfileSection"
import { whiteColor, grayColor, mainColor } from "../../defaultColors"
import { IUser } from "../../classes/IUser"

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

const ProfileShowInfo: React.FC<{userData: IUser, navigation: any, edit: () => void}> = ({ userData, navigation, edit }) => {
  return (
    <>
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
          <Pressable onPress={edit}>
            <Image source={require('../../assets/profile/edit.png')} style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.navButton}>
          <Pressable onPress={() => {navigation.navigate("SelectLanguage")}}>
            <Image source={require('../../assets/profile/settings.png')} style={styles.icon} />
          </Pressable>
        </View>
      </View>
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Контакты</ProfileSectionTitle>
        </ProfileSectionHeader>
        <ProfileSectionInfo>
          <View>
            <ProfileItemTitle>Email</ProfileItemTitle>
            <Text style={styles.itemValue}>{userData.user?.email}</Text>
          </View>
          <View>
            <ProfileItemTitle>Телефон</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.phone)}</Text>
          </View>
          <View>
            <ProfileItemTitle>WhatsApp</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.whatsapp)}</Text>
          </View>
          <View>
            <ProfileItemTitle>ВКонтакте</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.vk)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Telegram</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.telegram)}</Text>
          </View>
        </ProfileSectionInfo>
      </ProfileSection>
      <ProfileSection>
        <ProfileSectionHeader>
          <ProfileSectionTitle>Информация о студенте</ProfileSectionTitle>
        </ProfileSectionHeader>
        <ProfileSectionInfo>
          <View>
            <ProfileItemTitle>Пол</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.sex)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Дата рождения</ProfileItemTitle>
            <Text style={styles.itemValue}>{getDateValue(userData.user?.user_info?.birth_date)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Родной язык</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.native_language)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Другие языки</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.other_languages_and_levels)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Институт</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.institute)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Направление обучения</ProfileItemTitle>
            <Text style={styles.itemValue}>{getValue(userData.user?.study_program)}</Text>
          </View>
          <View>
            <ProfileItemTitle>Дата окончания последней визы</ProfileItemTitle>
            <Text style={styles.itemValue}>{getDateValue(userData.user?.last_visa_expiration)}</Text>
          </View>
        </ProfileSectionInfo>
      </ProfileSection>
    </>
  )
}

const styles = StyleSheet.create({
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

export default ProfileShowInfo;