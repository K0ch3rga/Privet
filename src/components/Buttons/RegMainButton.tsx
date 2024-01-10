import RegButton from "./RegButton";
import { ButtonProps } from "../../interfaces/ButtonProps";

const RegMainButton: React.FC<ButtonProps> = (props: ButtonProps) => {    
    return(
    <RegButton 
        title={props.title}
        onPress={props.onPress}
        showArrow={props.showArrow}
        buttonStyle={{backgroundColor: props.color}}
        titleStyle={{color: "#FFFFFF"}} 
    />
    )
}

export default RegMainButton;