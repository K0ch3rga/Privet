import { StyleSheet } from "react-native"; 
import CustomButton from "./CustomButton";
import { ButtonProps } from "../../interfaces/ButtonProps";
import { mainColor } from "../../defaultColors";
import { CurrentRenderContext } from "@react-navigation/native";


const MainButton: React.FC<ButtonProps> = (props: ButtonProps) => {    
    return(
    <CustomButton 
        title={props.title}
        onPress={props.onPress}
        showArrow={props.showArrow}
        buttonStyle={{backgroundColor: props.color}}
        titleStyle={{color: "#FFFFFF"}} />
    )
}

export default MainButton;