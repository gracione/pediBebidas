import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import api from '../../service/api';

const Endereco: React.FC = () => {
  const [endereco, setEndereco] = useState({
    rua: '45',
    numero: '123',
    bairro: 'Nome do Bairro2',
    complementar: 'Complemento2',
    latitude: '-23.55050',
    longitude: '-46.633308',
  });

  const handleChange = (field: string, value: string) => {
    setEndereco({ ...endereco, [field]: value });
  };

  const handleSave = async () => {
    const response = await api.post('endereco', endereco);

    console.log(response.data);
    Alert.alert('Endereço salvo com sucesso!');
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={endereco.rua}
        onChangeText={(text) => handleChange('rua', text)}
        placeholder="Rua"
      />
      <TextInput
        style={styles.input}
        value={endereco.numero}
        onChangeText={(text) => handleChange('numero', text)}
        placeholder="Número"
      />
      <TextInput
        style={styles.input}
        value={endereco.bairro}
        onChangeText={(text) => handleChange('bairro', text)}
        placeholder="Bairro"
      />
      <TextInput
        style={styles.input}
        value={endereco.complementar}
        onChangeText={(text) => handleChange('complementar', text)}
        placeholder="Complemento"
      />
      <TextInput
        style={styles.input}
        value={endereco.latitude}
        onChangeText={(text) => handleChange('latitude', text)}
        placeholder="Latitude"
      />
      <TextInput
        style={styles.input}
        value={endereco.longitude}
        onChangeText={(text) => handleChange('longitude', text)}
        placeholder="Longitude"
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Endereco;
