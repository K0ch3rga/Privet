import { View, StyleSheet, Dimensions } from "react-native"
import RegMainButton from "./Buttons/RegMainButton"
import { mainColor } from "../defaultColors"

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const popupContentWidth = width - 60;

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
          <RegMainButton 
            title="Close" 
            color={mainColor} 
            onPress={() => props.close(false)}
        />
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
    minHeight: 300,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    color: "black"
  },
});

export default Popup;