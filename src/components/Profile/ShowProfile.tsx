import { View, Text, Image, StyleSheet, Pressable, ColorValue } from "react-native"
import { ItemTitleProfile, SectionProfile, HeaderProfileSection, InfoProfileSection } from "./ProfileSection"
import { whiteColor, grayColor, mainColor, buddyColor, successColor, errorColor } from "../../defaultColors"
import { IStudent } from "../../classes/IStudent"
import { lang_and_level } from "./OtherLanguagesList"
import { getPageColor, useAccountStore } from "../../storage/AccountStore"
import { IBuddy } from "../../classes/IBuddy"

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

const getOtherLanguages = (langs: lang_and_level[] | undefined) => {
  if (!langs){
    return 
  }
  let result = '';
  langs.map(item => {
    result = result.concat(`${item.language} - ${item.level}`, '\n')
  })
  return result ? result : "—"
}

interface ShowProfileProps {
  userData: IBuddy | IStudent
  navigation: any, 
  edit: () => void, 
}

const pageColor = getPageColor();

const ShowProfile: React.FC<ShowProfileProps> = ({ userData, navigation, edit }) => {
  const isBuddy = useAccountStore(state => state.isBuddy)
  console.log(userData);
  
  return (
    <>
      <View style={styles.header}>
        <View>
          <Image source={require("../../assets/default-profile-pic.png")} style={styles.profilePic} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData.user?.user_info?.full_name}</Text>
          {isBuddy 
            ? <Text style={styles.otherInfo}>{userData.city}</Text>
            : <Text style={styles.otherInfo}>{userData.citizenship}</Text>
          }
          <Text style={styles.otherInfo}>{userData.user?.university}</Text>
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
      <SectionProfile>
        <HeaderProfileSection>
          Контакты
        </HeaderProfileSection>
        <InfoProfileSection>
          <View>
            <ItemTitleProfile>Email</ItemTitleProfile>
            <Text style={styles.itemValue}>{userData.user?.email}</Text>
          </View>
          <View>
            <ItemTitleProfile>Телефон</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.phone)}</Text>
          </View>
          <View>
            <ItemTitleProfile>WhatsApp</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.whatsapp)}</Text>
          </View>
          <View>
            <ItemTitleProfile>ВКонтакте</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.vk)}</Text>
          </View>
          <View>
            <ItemTitleProfile>Telegram</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.contacts?.telegram)}</Text>
          </View>
        </InfoProfileSection>
      </SectionProfile>
      <SectionProfile>
        <HeaderProfileSection>
          Информация о студенте
        </HeaderProfileSection>
        <InfoProfileSection>
        {isBuddy &&
            <View>
              <ItemTitleProfile>Тип профиля</ItemTitleProfile>
              <Text style={styles.itemValue}>Сопровождающий</Text>
            </View>
          }
          <View>
            <ItemTitleProfile>Пол</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.sex)}</Text>
          </View>
          <View>
            <ItemTitleProfile>Дата рождения</ItemTitleProfile>
            <Text style={styles.itemValue}>{getDateValue(userData.user?.user_info?.birth_date)}</Text>
          </View>
          <View>
            <ItemTitleProfile>Родной язык</ItemTitleProfile>
            <Text style={styles.itemValue}>{getValue(userData.user?.user_info?.native_language)}</Text>
          </View>
          <View>
            <ItemTitleProfile>Другие языки</ItemTitleProfile>
            <Text style={styles.itemValue}>{getOtherLanguages(userData.user?.user_info?.other_languages_and_levels)}</Text>
          </View>
          {isBuddy &&
            <View>
              <ItemTitleProfile>Статус Buddy</ItemTitleProfile>
              {userData.buddy_status 
                ? <Text style={[styles.itemValue, { color: successColor }]}>Подтверждён</Text>
                : <Text style={[styles.itemValue, { color: errorColor }]}>Неподтверждён</Text>
              }
            </View>
          }
        </InfoProfileSection>
      </SectionProfile>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 4,
    borderColor: pageColor,
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
    backgroundColor: pageColor,
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
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
  },
  itemValue: {
    color: "#000",
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16,
  }
});

export default ShowProfile;