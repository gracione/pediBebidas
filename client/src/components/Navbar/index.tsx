import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NavbarProps {
  navigation: any;
}

const Navbar: React.FC<NavbarProps> = ({ navigation }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('Pedidos')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FaleConosco')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Fale Conosco</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Sair')} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  menuButtonText: {
    fontSize: 18,
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Navbar;
