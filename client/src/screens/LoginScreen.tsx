import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import InputComponent from '../components/InputComponent';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    // Se a autenticação for bem-sucedida, navegue para a tela Home
    console.log('Botão de login pressionado');
    // navigation.navigate('Home'); // Descomente esta linha quando a autenticação for bem-sucedida
  };
  
  return (
    <View style={styles.container}>
      <InputComponent
        placeholder="Username"
        onChangeText={text => console.log(`Username: ${text}`)}
      />
      <InputComponent
        placeholder="Password"
        secureTextEntry
        onChangeText={text => console.log(`Password: ${text}`)}
      />
      <Button title="Login" onPress={handleLogin} />
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
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LoginScreen;
