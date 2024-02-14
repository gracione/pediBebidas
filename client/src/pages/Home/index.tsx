import React from 'react';
import { View, Text } from 'react-native';
import Navbar from '../../components/Navbar';

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Conteúdo da tela principal</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
