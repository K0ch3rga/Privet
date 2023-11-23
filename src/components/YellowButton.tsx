import { useFonts } from "expo-font";
import { View, Text, Pressable, StyleProp, StyleSheet, ViewStyle, Image } from "react-native"; 

const YellowButton: React.FC<YellowButtonProps> = (props: YellowButtonProps) => {
    const style = [defaultButtonStyle.button, props.style];
    console.log(props.style)

    const [] = useFonts({
        "LilitaOne": require("../assets/fonts/LilitaOne-Regular.ttf"),
    });
    
    return(
    <View>
        <Pressable onPress={props.onPress} style={style}>
            <Text style={defaultButtonStyle.buttonTitle}>{props.title}</Text>
            {props.showArrow && <Image source={require("../assets/arrow_right.png")} 
                                        style={defaultButtonStyle.arrow} />}
        </Pressable>
    </View>
    )
}

const defaultButtonStyle = StyleSheet.create({
    button: {
        position: "relative",
        backgroundColor: "#FFD869",
        width: 312,
        height: 51,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonTitle: {
        color: "#FFFFFF",
        fontSize: 25,
        fontFamily: "LilitaOne"
    },
    arrow: {
        position: "absolute",
        right: 17,
        height: 24,
        width: 15
    }
})

export interface YellowButtonProps {
    onPress: ()=>void;
    title: string;
    showArrow?: boolean;
    style?: StyleProp<ViewStyle> // FIXME разобраться со стилями
};
export default YellowButton;