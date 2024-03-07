import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<NavbarProps> = () => {
  let estabelecimentos = ['JM Distribuidora', 'Altas Horas'];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {estabelecimentos.map((estabelecimento, index) => (
          <TouchableOpacity key={index} onPress={() => console.log(estabelecimento)}>
            <View style={styles.card}>
              <Text style={styles.cardText}>{estabelecimento}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Text>Conteúdo da tela principal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#71ff64',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
