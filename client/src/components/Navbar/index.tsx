import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Drawer} from 'react-native-paper';
import { Icon} from 'react-native-elements';

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Navbar: React.FC<NavbarProps> = ({navigation, sairDoPerfil}) => {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = React.useState('');
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      
      <TouchableOpacity onPress={toggleMenu}>
        <Icon
          raised
          name="heartbeat"
          type="font-awesome"
          color="#f50"
        />
      </TouchableOpacity>
      {expanded && (
        <Drawer.Section title="Some title">
          <Drawer.Item
            label="First Item"
            active={active === 'first'}
            onPress={() => setActive('first')}
          />
          <Drawer.Item
            label="Sair"
            active={active === 'second'}
            onPress={() => sairDoPerfil()}
          />
        </Drawer.Section>
      )}
    </View>
  );
};

export default Navbar;
