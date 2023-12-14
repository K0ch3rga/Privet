import { View, StyleSheet, Dimensions } from "react-native"
import MainButton from "./Buttons/MainButton"
import { mainColor } from "../defaultColors"

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 30;

export interface PopupProps {
  close?: (arg: boolean) => void,
  children?: any,
}

const Popup: React.FC<PopupProps> = (props) => {
  return(
    <View style={styles.popup}>
        <View style={styles.popupWrapper}>
          <View style={styles.popupContent}>
            {props.children}
          </View>
          {!!props.close && 
            <MainButton title="Close" color={mainColor} onPress={() => props.close(false)} />
          }
        </View>
      </View>
      
  )
}

const styles = StyleSheet.create({
  popup: {
    zIndex: 5,
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(169, 169, 169, 0.95)",
  },
  popupWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,    
  },
  popupContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: popupContentWidth,
    height: 300,
    paddingHorizontal: 22,
    paddingVertical: 29,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    color: "black"
  },
});

export default Popup;