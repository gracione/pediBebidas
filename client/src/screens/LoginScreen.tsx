import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import InputComponent from '../components/InputComponent';
import LogoImage from '../assets/logo.png'; 

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Botão de login pressionado');
    // navigation.navigate('Home');
  };
  
  return (
    <View style={styles.container}>
      <Image source={LogoImage} style={styles.logo} />
      <InputComponent
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <InputComponent
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
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
