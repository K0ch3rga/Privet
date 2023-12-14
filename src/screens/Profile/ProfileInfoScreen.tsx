import { useState } from "react";
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
}

export interface RequestProps {
  citizenship?: string,
  user?: UserProps
}


const ProfileInfoScreen: React.FC = () => {

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

  const [constactsActive, setConstactsActive] = useState(false);
  const [citizenship, setCitizenship] = useState("");
  const [contacts, setContacts] = useState<ContactsProps>();
  const [userInfo, setUserInfo] = useState<UserInfoProps>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [otherLangsActive, setOtherLangsActive] = useState(false);


  const handleSend = () => {
    const data = {
      citizenship: citizenship,
      user: {
        email: "test1@frontend.ru",
        user_info: {
          ...userInfo,
          contacts: {
            ...contacts
          }
        } as UserInfoProps
      } as UserProps
    } as RequestProps;
    console.log(data);
    
    sendChangeProfileInfoRequest(5, data, setLoading, setError, setErrorMessage);
  }

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
            setUserInfo({
              ...userInfo,
              full_name: text
            })
          }

          }/>
          <View>
            <Text>Citizenship</Text>
            <Select 
            data={counties}
            setChosenValue={setCitizenship}
            />
          </View>
          <View>
            <Text>Sex</Text>
            <Select 
              data={genders}
              setChosenValue={(text: string) => {
                setUserInfo({
                  ...userInfo,
                  sex: text
                })
              }}/>
          </View>

          <RegInput 
          placeholder="Birth Date"
          setProperty={(text: string) => {
            setUserInfo({
              ...userInfo,
              birth_date: text
            })
          }}/>
          
          <MainButton color={mainColor} title="Add Contacts" onPress={() => {setConstactsActive(!constactsActive)}}/>
          {constactsActive && 
            <View style={styles.contactsWrapper}>
              <RegInput 
              placeholder="Phone"
              setProperty={(text: string) => {
                setContacts({
                  ...contacts,
                  phone: text
                })
              }}/>
              <RegInput 
                placeholder="Telegram"
                setProperty={(text: string) => {
                  setContacts({
                    ...contacts,
                    telegram: text
                  })
                }}/>
              <RegInput 
                placeholder="WhatsApp"
                setProperty={(text: string) => {
                  setContacts({
                    ...contacts,
                    whatsapp: text
                  })
                }}/>
              <RegInput 
                placeholder="VK"
                setProperty={(text: string) => {
                  setContacts({
                    ...contacts,
                    vk: text
                  })
                }}/>
            </View>}
          
          <Text>Native language</Text>
          <Select 
            data={languages} 
            setChosenValue={(text: string) => 
            setUserInfo({
              ...userInfo,
              native_language: text
            })}/>

          <MainButton color={mainColor} title="Add Other Languages" onPress={() => {setOtherLangsActive(!otherLangsActive)}}/>
          {otherLangsActive && 
            <View style={styles.contactsWrapper}>
              <RegInput placeholder="Other languages" setProperty={(text: string) => 
                setUserInfo({
                  ...userInfo,
                  other_languages_and_levels: text
                })
              }/>
            </View>}
        </View>
        <MainButton color={mainColor} title="Update acconnt" onPress={handleSend} />
      </View>

      {loading && 
        <Popup>
          Loading...
        </Popup>
      }

      {error && 
        <Popup
        close={setError}>
          {errorMessage}
        </Popup>
      }
    </>
  );
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
