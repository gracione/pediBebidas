import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Input';
import Button from '../components/Button';
import LogoImage from '../assets/logo.png';
import api, { saveToken } from '../service/api';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setError(null);

    try {
      const response = await api.post('usuario/autenticar', {
        email: email,
        password: password,
      });

      saveToken(response.data.token);
      navigation.navigate('Home');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        console.error('Erro ao processar a requisição:', error.message);
      }
    }
  };

  const handleRegistrar = () => {
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
      {error && <Text style={styles.error}>{error}</Text>}
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
  error: {
    color: 'red',
    margin: 10,
  },
});

export default LoginScreen;