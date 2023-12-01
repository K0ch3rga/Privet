import { useState } from "react";
import { View, Text, Pressable, StyleProp, StyleSheet, ViewStyle, Image, Button, Dimensions } from "react-native"; 
import YellowButton from "./YellowButton";
import RegistrationScreen from "./registration/RegistrationScreen";

var width = Dimensions.get('window').width;

function RegScreenComponent(){
  return <RegistrationScreen />
}

const ProfileScreen: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState();
  const currentScreen = RegScreenComponent();


  return(
    <View style={styles.wrapper}>
      <View style={styles.mainInfo}>
        <Image style={styles.mainInfoImage} source={require("../assets/default-profile-pic.png")} />
        <Text style={styles.mainInfoText}>Name</Text>
      </View>
      <View style={styles.profileButtonWrapper}>
        <Pressable style={styles.profileButton}><Text style={styles.profileButtonTitle}>View profile info</Text></Pressable>
        <Pressable style={styles.profileButton}><Text style={styles.profileButtonTitle}>Notifications</Text></Pressable>
        <Pressable style={styles.profileButton}><Text style={styles.profileButtonTitle}>Change Language</Text></Pressable>
        <Pressable style={styles.profileButton}><Text style={styles.profileButtonTitle}>Log Out</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: width
    },
    mainInfo: {
      backgroundColor: "gray",
      flexDirection: "row",
      alignItems: "center"
    },
    mainInfoImage: {
      height: 50,
      width: 50,
      borderRadius: 50
    },
    mainInfoText: {
      fontSize: 25,
      marginLeft: 20
    },
    profileButtonWrapper: {
      marginTop: 80,
      gap: 5
    },
    profileButton: {
      height: 50,
      width: 200,
      backgroundColor: "#d6d6d6",
      borderRadius: 10,
      paddingLeft: 15
    },
    profileButtonTitle: {
      fontSize: 18
    },
})

export default ProfileScreen;