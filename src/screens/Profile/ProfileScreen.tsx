import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RegMainButton from "../../components/Buttons/RegMainButton";
import { buddyColor, mainColor, secondaryColor, whiteColor } from "../../defaultColors";
import { sendChangeProfileInfoRequest } from "../../requests/ChangeProfileInfoRequest";
import Popup from "../../components/Popup";
import { IStudent } from "../../classes/IStudent";
import { fetchUserInfo } from "../../requests/GetProfileInfo";
import { ScreenProps } from "../../interfaces/ScreenProps";
import ShowProfile from "../../components/Profile/ShowProfile";
import EditProfile from "../../components/Profile/EditProfile";
import RegButton from "../../components/Buttons/RegButton";
import { useAccountStore } from "../../storage/AccountStore";
import { useStudentStore } from "../../storage/StudentStore";
import { useBuddyStore } from "../../storage/BuddyStore";

const ProfileScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const user_id = useAccountStore(state => state.user_id)
  const isBuddy = useAccountStore(state => state.isBuddy)

  const [pageColor, userData, setUserData] = isBuddy 
    ? [buddyColor, useBuddyStore(state => state.buddyData), useBuddyStore(state => state.setBuddyData)] as const
    : [mainColor, useStudentStore(state => state.studentData), useStudentStore(state => state.setStudentData)] as const;

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
          : <RegMainButton title="Close" color={pageColor} onPress={() => setError(false)}/>
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
                buttonStyle={{backgroundColor: pageColor}}
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
