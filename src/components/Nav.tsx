import {View, Text, Button} from "react-native";

const Navigation = () => {
  return (
    <>
      <Button title={"Welcome"} onPress={() => console.log("Welcome")} />
      <Button title={"Task"} onPress={() => console.log("Task")} />
    </>
  );
};
