import RegButton from "./RegButton";
import { ButtonProps } from "../../interfaces/ButtonProps";


const RegSecondaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {    
    return(
    <RegButton 
        title={props.title}
        onPress={props.onPress}
        showArrow={props.showArrow}
        buttonStyle={{backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: props.color}}
        titleStyle={{color: props.color}} />
    )
}

export default RegSecondaryButton;