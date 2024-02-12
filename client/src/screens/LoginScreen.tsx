import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Input';
import Button from '../components/Button';
import LogoImage from '../assets/logo.png';
import api from '../service/api';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const handleLogin = async (email: string, password: string) => {
  console.log('Botão de login pressionado');
  try {
    const response = await api.post('usuario/autenticar', {
      email: email,
      password: password,
    });

    console.log(response.data); // Se a resposta for bem-sucedida, imprime os dados
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data.error); // Se a resposta for 400, imprime a mensagem de erro
    } else {
      console.error('Erro ao processar a requisição:', error.message);
    }
  }
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistrar = () => {
    console.log('Botão de registrar pressionado');
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />
      <Input placeholder="Username" onChangeText={text => setEmail(text)} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={() => handleLogin(email, password)} />
      <Button title="Registrar" onPress={handleRegistrar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 240,
    marginBottom: 40,
  },
  input: {
    width: '80%',
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LoginScreen;
