import React from 'react';
import {View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import Endereco from '../../pages/Perfil/Endereco';
import MeusEstabelecimentos from '../../pages//Perfil/MeusEstabelecimentos';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface NavbarProps {
  sairDoPerfil: () => void;
  navigation: any;
}

const Stack = createNativeStackNavigator();

interface MenuItem {
  name: string;
  url: string;
  subtitle: string;
  function?: () => void;
}

const Menu: React.FC<NavbarProps> = ({navigation, sairDoPerfil}) => {
  const list: MenuItem[] = [
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
      function: () => navigation.navigate('Endereco'),
    },
    {
      name: 'Meus Estabelecimentos',
      url: '../../assets/sem_usuario.png',
      subtitle: '',
      function: () => navigation.navigate('Meus Estabelecimentos'),
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
      {list.map((item, index) => (
        <ListItem key={index} bottomDivider onPress={item.function}>
          <Avatar source={{uri: item.url}} />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

const Perfil: React.FC<NavbarProps> = ({sairDoPerfil}) => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {props => <Menu {...props} sairDoPerfil={sairDoPerfil} />}
        </Stack.Screen>
        <Stack.Screen name="Meus Estabelecimentos" component={MeusEstabelecimentos} />
        <Stack.Screen name="Endereco" component={Endereco} />
      </Stack.Navigator>
    </View>
  );
};

export default Perfil;
