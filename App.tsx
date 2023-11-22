import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from './src/welcome/Carousel';
import YellowButton  from './src/YellowButton';
import WelcomeScreen from './components/HelloScreen';


export default function App() {
  const [count, setCount] = useState(50);
  
  return (
    <View style={styles.container}>
      <WelcomeScreen />
      <StatusBar style="auto" />
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