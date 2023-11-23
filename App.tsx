import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import YellowButton  from './src/components/YellowButton';
import WelcomeScreen from './src/components/WelcomeScreen';


export default function App() {
  const [count, setCount] = useState(50);
  
  return (
    <View style={styles.container}>
      <WelcomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  button: {
    color:'#fff',
    width: 100,
    height: 50

  },
  text: {
    color: '#000',
  }
});