import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RegMainButton from "../../components/Buttons/RegMainButton";
import { mainColor, secondaryColor, whiteColor } from "../../defaultColors";
import { sendChangeProfileInfoRequest } from "../../requests/ChangeProfileInfoRequest";
import Popup from "../../components/Popup";
import { IUser } from "../../classes/IUser";
import { fetchUserInfo } from "../../requests/GetProfileInfo";
import { ScreenProps } from "../../interfaces/ScreenProps";
import ShowProfile from "../../components/Profile/ShowProfile";
import EditProfile from "../../components/Profile/EditProfile";
import RegButton from "../../components/Buttons/RegButton";

export const user_id = 58;

const ProfileScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<IUser>({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSend = () => {
    if (userData) {
      sendChangeProfileInfoRequest(user_id, userData, setLoading, setError, setErrorMessage);
    }
    else{
      setErrorMessage("User Data is empty")
      setError(true)
    }
  }

  useEffect(() => {
    fetchUserInfo(user_id, setLoading, setUserData, setError, setErrorMessage);
  }, [])

  if (isLoading) {
    return (
      <Popup>
        <Text>Loading...</Text>
      </Popup>
    )
  }

  if (error) {
    return (
      <Popup>
        <Text>{errorMessage}</Text>
        { errorMessage === 'Profile info is not found!' ? 
          <RegMainButton title="Contact Support" color={secondaryColor} />
          : <RegMainButton title="Close" color={mainColor} onPress={() => setError(false)}/>
        }
      </Popup>
    )
  }

  if (!userData.user?.user_info?.other_languages_and_levels) {
    setUserData({
      ...userData,
      user: {
        ...userData.user,
        user_info: {
          ...userData.user?.user_info,
          other_languages_and_levels: []
        }
      }})
  }

  if (isEdit) {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
            <EditProfile 
              userData={userData} 
              setUserData={setUserData}
            />
            <View style={{ alignItems: "center", gap: 10 }}>
              <RegButton 
                title="Сохранить"
                onPress={handleSend}
                buttonStyle={{backgroundColor: mainColor}}
              />
              <RegButton 
                title="Отменить"
                onPress={() => {setIsEdit(false)}}
                buttonStyle={{backgroundColor: "#FF6969"}}
              />
            </View>
        </View>
      </ScrollView>
    )
  }

  if (userData) {
    return (
      <View >
        <ScrollView>
          <View style={styles.wrapper}>
            <ShowProfile 
              userData={userData} 
              navigation={navigation}
              edit={() => {setIsEdit(true)}}
            />
          </View>
        </ScrollView>
      </View>
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
})

export default ProfileScreen;
