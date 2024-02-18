import React from 'react';
import {View, Text} from 'react-native';
import Navbar from '../../components/Navbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
  sairDoPerfil: () => void;
}

const HomeScreen: React.FC<NavbarProps> = ({navigation, sairDoPerfil}) => {
  return (
    <View style={{flex: 1}}>
      <Navbar navigation={navigation} sairDoPerfil={sairDoPerfil} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Conteúdo da tela principal</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
