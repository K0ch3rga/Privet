import { Pressable, StyleSheet, Text } from "react-native";
import { ButtonProps } from "../../interfaces/ButtonProps";

const MainButton: React.FC<ButtonProps> = (props) => {
  return (
    <Pressable 
      style={[styles.button, { backgroundColor: props.color }, props.style ]}
      onPress={props.onPress}
    >
      <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 30,
    minWidth: "100%"
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 20
  }
})

export default MainButton;