import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function LoginScreen () {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    // Se a autenticação for bem-sucedida, navegue para a tela Home
    // navigation.navigate('Home');
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;