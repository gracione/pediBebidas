import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../components/Input';
import Button from '../components/Button';
import LogoImage from '../assets/logo.png';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Botão de login pressionado');
    // navigation.navigate('Home');
  };
  const handleRegistrar = () => {
    console.log('Botão de registrar pressionado');
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />
      <Input
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
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
  // Additional styles for InputComponent
  input: {
    width: '80%',
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LoginScreen;
