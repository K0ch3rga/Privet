import {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, FlatList, Pressable} from "react-native";
import {grayColor, mainColor, whiteColor} from "../defaultColors";

const Select = (props: SelectProps) => {
  const [expanded, setExpanded] = useState(false);
  const value = props.initialValue ? props.initialValue : ''

  const openHandle = () => setExpanded(!expanded);

  const toggleSelect = (value: string) => {
    // setValue(value);
    if (!!props.setChosenValue) {
      props.setChosenValue(value);
    }
    setExpanded(false);
  };

  return (
    <View>
      <SelectButton text={value} onPress={openHandle} profile={props.profile} />
      {expanded && (
        <FlatList
          data={props.data}
          renderItem={({item}) => (
            <SelectOption
              text={item}
              onPress={() => toggleSelect(item)}
              selected={value}
            />
          )}
          style={style.List}
        />
      )}
    </View>
  );
};

export const SelectButton = (props: SelectButtonProps) => {
  const btnStyle = props.profile ? [style.Button, style.buttonProfile] : style.Button;
  const arrow = props.profile ? require("../assets/profile/profile-select-arrow.png") : require("../assets/arrow_down.png");
  const arrowStyle = props.profile ? [style.Arrow, style.profileArrow] : style.Arrow;
  const textStyle = props.profile ? [style.MainText, style.profileText] : style.MainText;

  return (
    <Pressable style={btnStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.text}</Text>
      <Image
        source={arrow}
        style={arrowStyle}
      />
    </Pressable>
  );
};

export const SelectOption = (props: SelectOptionProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {/* Объединение с подчёркиванием, чтобы знать что выбрано */}
      <Text
        style={[
          style.OptionText,
          {
            textDecorationLine:
              props.selected == props.text ? "underline" : "none",
          },
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  Button: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    // width: 312,
    height: 51,
    borderColor: mainColor,
    borderWidth: 3,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonProfile: {
    height: 38,
    borderWidth: 2, 
    borderRadius: 10,
    borderColor: mainColor,
    backgroundColor: whiteColor,
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16,
    color: "#000",
    paddingLeft: 11,
    paddingRight: 7,
    paddingVertical: 8
  },
  MainText: {
    fontFamily: "LilitaOne",
    fontSize: 25,
    fontWeight: "400",
    color: grayColor,
  },
  profileText: {
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 16,
    color: "#000",
  },
  OptionText: {
    // a чё?
  },
  Arrow: {
    height: 14.25,
    width: 24,
  },
  profileArrow: {
    height: 15,
    width: 15
  },
  List: {

  }
});

export interface SelectProps {
  data: string[]; 
  initialValue?: string;
  setChosenValue?: (value: string) => void;
  profile? : boolean
}

export interface SelectOptionProps {
  imagePath?: string;
  text: string;
  selected?: string;
  onPress?: () => void;
}

export interface SelectButtonProps {
  text: string;
  imagePath?: string;
  onPress: () => void;
  profile? : boolean
}

export default Select;
