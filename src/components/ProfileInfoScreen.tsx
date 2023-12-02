import { View, Text } from "react-native";
import RegInput from "./registration/RegInput";
import { StyleSheet } from "react-native";
import Select from "./Select";
import { SelectProps } from "./Select";
import YellowButton from "./YellowButton";
import { useState } from "react";


const ProfileInfoScreen: React.FC = () => {

  const counties: SelectProps[] = [
    {text: 'Russia'},
    {text: 'China'},
    {text: 'Korean'},
  ];

  const genders: SelectProps[] = [
    {text: "Male"},
    {text: "Female"}
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
  const [otherLangsActive, setOtherLangsActive] = useState(false);

  return(
    <View>
      <View>
        <Text>Photo</Text>
      </View>

      <View style={styles.profileInputsWrapper}>
        <RegInput placeholder="Full Name"/>
        <Text>Citizenship</Text>
        <Select data={counties}/>
        <Text>Sex</Text>
        <Select data={genders}/>
        <RegInput placeholder="Birth Date"/>
        
        <YellowButton title="Add Contacts" onPress={() => {setConstactsActive(!constactsActive)}}/>
        {constactsActive && 
          <View style={styles.contactsWrapper}>
            <RegInput placeholder="Phone"/>
            <RegInput placeholder="Email"/>
            <RegInput placeholder="Telegram"/>
            <RegInput placeholder="WhatsApp"/>
            <RegInput placeholder="VK"/>
          </View>}
        
        <Text>Native language</Text>
        <Select data={languages} />

        <YellowButton title="Add Other Languages" onPress={() => {setOtherLangsActive(!otherLangsActive)}}/>
        {otherLangsActive && 
          <View style={styles.contactsWrapper}>
            <Select data={languages} />
            <Select data={langLevels} />
          </View>}

        <Select data={universityes} />
      </View>
    </View>  
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
