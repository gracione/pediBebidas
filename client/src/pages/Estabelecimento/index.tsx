import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Estabelecimento: React.FC<NavbarProps> = () => {
  let produtos = [{nome: 'coca', valor: '12,00 R$'}, {nome: 'pepsi', valor: '10,00 R$'}];

  return (
    <View style={{flex: 1}}>
      <View style={styles.searchContainer}></View>
      <ScrollView style={{flex: 1}}>
        {produtos.map((produto, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => console.log(produto.nome)}>
            <View style={styles.card}>
              <Text style={styles.cardText}>{produto.nome}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 14,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    width: '80%',
  },
  card: {
    backgroundColor: '#71ff64',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Estabelecimento;
