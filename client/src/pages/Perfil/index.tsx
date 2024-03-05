import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListItem, Avatar} from 'react-native-elements';
interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
  sairDoPerfil: () => void;
}

const Perfil: React.FC<NavbarProps> = ({navigation, sairDoPerfil}) => {
  const list = [
    {
      name: 'Ajuda',
      url: '../../assets/sem_usuario.png',
      subtitle: '',
    },
    {
      name: 'Configurações',
      url: '../../assets/sem_usuario.png',
      subtitle: '',
    },
    {
      name: 'Endereço',
      url: '../../assets/sem_usuario.png',
      subtitle: '',
    },
    {
      name: 'Sair',
      url: '../../assets/sem_usuario.png',
      subtitle: '',
      function: sairDoPerfil,
    },
  ];
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider onPress={l.function}>
          <Avatar source={{uri: l.url}} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default Perfil;
