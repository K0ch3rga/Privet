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
import { useAccountStore } from "../../storage/AccountStore";
import { useUserStore } from "../../storage/UserStore";

const ProfileScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const userData = useUserStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);

  const user_id = useAccountStore(state => state.user_id)

  const handleSend = () => {
    if (userData) {
      sendChangeProfileInfoRequest(user_id, userData, setLoading, setError, setErrorMessage);
    }
    else{
      setErrorMessage("User Data is empty");
      setError(true);
    }
  }

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
      <ScrollView>
        <View style={styles.wrapper}>
          <ShowProfile 
            userData={userData} 
            navigation={navigation}
            edit={() => {setIsEdit(true)}}
          />
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
})

export default ProfileScreen;
