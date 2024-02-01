import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './src/navigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Navigation />
  );
}

export default App;