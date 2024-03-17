import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, Button, Alert} from 'react-native';
import api from '../../../service/api';

const Endereco: React.FC = () => {
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    bairro: '',
    complementar: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('endereco');
        const {data} = response;
        setEndereco(data);
      } catch (error) {
        console.error(error);
        Alert.alert(
          'Erro ao carregar endereço. Por favor, tente novamente mais tarde.',
        );
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setEndereco({...endereco, [field]: value});
  };

  const handleSave = async () => {
    try {
      const response = await api.put('endereco', endereco);
      Alert.alert('Endereço salvo com sucesso!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errosMessages = error.response.data.errors;
        let messages = '';
        errosMessages.forEach(element => {
          messages += element.message + '\n';
        });
        Alert.alert(messages);
      } else {
        console.log(error);
        Alert.alert(
          'Erro ao salvar endereço. Por favor, tente novamente mais tarde.',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={endereco.rua}
        onChangeText={text => handleChange('rua', text)}
        placeholder="Rua"
      />
      <TextInput
        style={styles.input}
        value={endereco.numero.toString()}
        onChangeText={text => handleChange('numero', text)}
        placeholder="Número"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={endereco.bairro}
        onChangeText={text => handleChange('bairro', text)}
        placeholder="Bairro"
      />
      <TextInput
        style={styles.input}
        value={endereco.complementar}
        onChangeText={text => handleChange('complementar', text)}
        placeholder="Complemento"
      />
      <TextInput
        style={styles.input}
        value={endereco.latitude.toString()}
        onChangeText={text => handleChange('latitude', text)}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={endereco.longitude.toString()}
        onChangeText={text => handleChange('longitude', text)}
        placeholder="Longitude"
        keyboardType="numeric"
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
