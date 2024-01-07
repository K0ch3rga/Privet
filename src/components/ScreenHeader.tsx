import { Text, StyleSheet } from "react-native";
import { secondBlackColor } from "../defaultColors";

const ScreenHeader: React.FC<{ children: any }> = ({ children }) => {
  return(
    <Text style={styles.header}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  header: {
    color: secondBlackColor,
    fontFamily: "LilitaOne",
    fontWeight: '400',
    fontSize: 30,
    textAlign: "center",
  }
})

export default ScreenHeader;