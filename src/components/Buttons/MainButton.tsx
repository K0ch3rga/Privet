import CustomButton from "./CustomButton";
import { ButtonProps } from "../../interfaces/ButtonProps";

const MainButton: React.FC<ButtonProps> = (props: ButtonProps) => {    
    return(
    <CustomButton 
        title={props.title}
        onPress={props.onPress}
        showArrow={props.showArrow}
        buttonStyle={{backgroundColor: props.color}}
        titleStyle={{color: "#FFFFFF"}} 
    />
    )
}

export default MainButton;