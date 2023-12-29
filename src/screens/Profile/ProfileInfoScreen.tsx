import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RegInput from "../../components/RegInput";
import Select, { SelectProps } from "../../components/Select";
import MainButton from "../../components/Buttons/MainButton";
import { mainColor } from "../../defaultColors";
import { sendChangeProfileInfoRequest } from "../../requests/ChangeProfileInfoRequest";
import Popup from "../../components/Popup";

interface ContactsProps {
  vk?: string,
  phone?: string,
  telegram?: string,
  whatsapp?: string
}

interface UserInfoProps {
  full_name?: string,
  sex?: string,
  birth_date?: string,
  native_language?: string,
  other_languages_and_levels?: string
  contacts?: ContactsProps
}

interface UserProps {
  email?: string,
  user_info?: UserInfoProps
  institute?: string,
  study_program?: string,
  last_visa_expiration?: string,
  accommodation?: string
}

export interface RequestProps {
  citizenship?: string,
  user?: UserProps
}

const counties: SelectProps[] = [
  {text: 'Russia'},
  {text: 'China'},
  {text: 'Korea'},
];

const genders: SelectProps[] = [
  {text: "male"},
  {text: "female"}
];

const languages: SelectProps[] = [
  {text: "Russian"},
  {text: "English"},
  {text: 'Chinese'},
];

const langLevels: SelectProps[] = [
  {text: "A1"},
  {text: "A2"},
  {text: 'B1'},
];

const universityes: SelectProps[] = [
  {text: "УрФУ"},
  {text: "УрГЭУ"},
  {text: "УГПУ"},
];

const ProfileInfoScreen: React.FC = () => {
  const [constactsActive, setConstactsActive] = useState(false);
  const [userData, setUserData] = useState<RequestProps>();
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
    console.log("Starting the load");
    setLoading(true)
    
    const fetchUserInfo = () => {
      try {
        fetch(url)
        .then((responce) => {
          return responce.json()
        })
        .then((json) => {
          const user = json as RequestProps
          setUserData(user);
        })
        .finally(() => {
          setLoading(false)
          console.log(isLoading);
        });
      }
      catch (error) {
        console.error("Ошибка: ", error)
        setLoading(false)
        console.log(isLoading);
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
  console.log(userData?.user?.user_info);
  
  if (userData){
    return(
      <>
        <View>
          <View>
            <Text>Photo</Text>
          </View>
          <View style={styles.profileInputsWrapper}>
            <RegInput 
            placeholder="Full Name" 
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    full_name: text
                  }
                }})}
            }
            value={userData?.user?.user_info?.full_name}
            />
            <View>
              <Text>Citizenship</Text>
              <Select 
              data={counties}
              setChosenValue={(text: string) => {
                setUserData({
                  ...userData,
                  citizenship: text
                })
              }}
              initialValue={userData?.citizenship}
              />
            </View>
            <View>
              <Text>Sex</Text>
              <Select 
                data={genders}
                setChosenValue={(text: string) => {
                  setUserData({
                    ...userData,
                    user: {
                      ...userData.user,
                      user_info: {
                        ...userData.user?.user_info,
                        sex: text
                      }
                    }})}
                }
                initialValue={userData.user?.user_info?.sex}
                />
            </View>
  
            <RegInput 
              placeholder="Birth Date"
              setProperty={(text: string) => {
                setUserData({
                  ...userData,
                  user: {
                    ...userData.user,
                    user_info: {
                      ...userData.user?.user_info,
                      birth_date: text
                    }
                  }})}
              }
              value={userData.user?.user_info?.birth_date}
            />
            
            <MainButton color={mainColor} title="Add Contacts" onPress={() => {setConstactsActive(!constactsActive)}}/>
            {constactsActive && 
              <View style={styles.contactsWrapper}>
                <RegInput 
                placeholder="Phone"
                setProperty={(text: string) => {
                  setUserData({
                    ...userData,
                    user: {
                      ...userData.user,
                      user_info: {
                        ...userData.user?.user_info,
                        contacts: {
                          ...userData.user?.user_info?.contacts,
                          phone: text
                        }
                      }
                    }})}
                }
                value={userData.user?.user_info?.contacts?.phone}
                />
                <RegInput 
                  placeholder="Telegram"
                  setProperty={(text: string) => {
                    setUserData({
                      ...userData,
                      user: {
                        ...userData.user,
                        user_info: {
                          ...userData.user?.user_info,
                          contacts: {
                            ...userData.user?.user_info?.contacts,
                            telegram: text
                          }
                        }
                      }})}
                  }
                  value={userData.user?.user_info?.contacts?.telegram}
                />
                <RegInput 
                  placeholder="WhatsApp"
                  setProperty={(text: string) => {
                    setUserData({
                      ...userData,
                      user: {
                        ...userData.user,
                        user_info: {
                          ...userData.user?.user_info,
                          contacts: {
                            ...userData.user?.user_info?.contacts,
                            whatsapp: text
                          }
                        }
                      }})}
                  }
                  value={userData.user?.user_info?.contacts?.whatsapp}
                />
                <RegInput 
                  placeholder="VK"
                  setProperty={(text: string) => {
                    setUserData({
                      ...userData,
                      user: {
                        ...userData.user,
                        user_info: {
                          ...userData.user?.user_info,
                          contacts: {
                            ...userData.user?.user_info?.contacts,
                            vk: text
                          }
                        }
                      }})}
                  }
                  value={userData.user?.user_info?.contacts?.vk}
                />
              </View>}
            
            <Text>Native language</Text>
            <Select 
              data={languages} 
              setChosenValue={(text: string) => {
                setUserData({
                  ...userData,
                  user: {
                    ...userData.user,
                    user_info: {
                      ...userData.user?.user_info,
                      native_language: text
                    }
                  }})}
              }
              initialValue={userData.user?.user_info?.native_language}
            />
  
            <MainButton color={mainColor} title="Add Other Languages" onPress={() => {setOtherLangsActive(!otherLangsActive)}}/>
            {otherLangsActive && 
              <View style={styles.contactsWrapper}>
                <RegInput 
                  placeholder="Other languages" 
                  setProperty={(text: string) => {
                    setUserData({
                      ...userData,
                      user: {
                        ...userData.user,
                        user_info: {
                          ...userData.user?.user_info,
                          other_languages_and_levels: text
                        }
                      }})}
                  }
                  value={userData.user?.user_info?.other_languages_and_levels}
                />
              </View>}
          </View>
          <MainButton color={mainColor} title="Update account" onPress={handleSend} />
        </View>

        {error && 
          <Popup
          close={setError}>
            {errorMessage}
          </Popup>
        }
      </>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {

  },
  profilePictureWrapper: {

  },
  profileInputsWrapper: {
    gap: 15,
    paddingHorizontal: 20,
    marginTop: 30
  },
  contactsWrapper: {
    gap: 5,
    paddingLeft: 50,
  }
});

export default ProfileInfoScreen;
