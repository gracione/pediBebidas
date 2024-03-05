import React from 'react';
import {View, Text} from 'react-native';
import Navbar from '../../components/Navbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<NavbarProps> = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Conteúdo da tela principal</Text>
      </View>
    </View>
  );
};

export default Home;
