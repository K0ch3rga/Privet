import { View, Text, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

const YellowButton = (props: YellowButtonProps) => {
    const style = [props.style, defaultButtonStyle.yellowBackground];
    console.log(props.style)
    return(<View style={StyleSheet.create({view: {width: 100}}).view}>
        <Pressable onPress={props.onPress} style={style}>
            <Text>{props.title}</Text>
        </Pressable>
    </View>)
}

const defaultButtonStyle = StyleSheet.create({
    yellowBackground: {
        backgroundColor: '#FFD869'
    }
})

export interface YellowButtonProps {
    onPress: ()=>void;
    title: string;
    style?: StyleProp<ViewStyle> // FIXME разобраться со стилями
};
export default YellowButton;