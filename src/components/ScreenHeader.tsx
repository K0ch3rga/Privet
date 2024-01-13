import { Text, StyleSheet, Pressable, View, Image } from "react-native";
import { secondBlackColor } from "../defaultColors";

const ScreenHeader: React.FC<{ children?: any, backButton?: boolean, navigation?: any }> = ({ children, backButton, navigation }) => {
  return(
    <View style={styles.wrapper}>
      { backButton &&
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require("../assets/arrow_return.png")} style={{ width: 12, height: 20 }} />
        </Pressable>
      }
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>{children}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%"
  },
  header: {
    color: secondBlackColor,
    fontFamily: "LilitaOne",
    fontWeight: '400',
    fontSize: 30,
    textAlign: "center",
  }
})

export default ScreenHeader;