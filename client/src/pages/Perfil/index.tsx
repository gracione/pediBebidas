import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
  sairDoPerfil: () => void; // Corrigido o tipo de sairDoPerfil
}

const Perfil: React.FC<NavbarProps> = ({ navigation, sairDoPerfil }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Perfil</Text>
        {/* Adicionado TouchableOpacity para tornar "Sair" clicável */}
        <TouchableOpacity onPress={sairDoPerfil}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Perfil;
