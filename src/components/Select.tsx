import {useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, FlatList, Pressable} from "react-native";
import {grayColor, mainColor} from "../defaultColors";

const Select = (props: SelectProps) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.initialValue? props.initialValue: '');

  const openHandle = () => setExpanded(!expanded);

  const toggleSelect = (value: string) => {
    setValue(value);
    if (!!props.setChosenValue) {
      props.setChosenValue(value);
    }
    setExpanded(false);
  };

  return (
    <View>
      <SelectButton text={value} onPress={openHandle} />
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
  return (
    <Pressable style={style.Button} onPress={props.onPress}>
      <Text style={style.MainText}>{props.text}</Text>
      <Image
        source={require("../assets/arrow_down.png")}
        style={style.Arrow}
      />
    </Pressable>
  );
};

export const SelectOption = (props: SelectOptionProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {/* {props.imagePath && <Image source={require(props.imagePath)} />} */}
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
    width: 312,
    height: 51,
    borderColor: mainColor,
    borderWidth: 3,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  MainText: {
    fontFamily: "LilitaOne",
    fontSize: 25,
    fontWeight: "400",
    color: grayColor,
  },
  OptionText: {
    // a чё?
  },
  Arrow: {
    height: 14.25,
    width: 24,
  },
  List: {

  }
});

export interface SelectProps {
  data: string[]; 
  initialValue?: string;
  setChosenValue?: (value: string) => void;
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
}

export default Select;
