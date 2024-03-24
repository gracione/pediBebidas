import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Input from '../components/Input';
import Button from '../components/Button';
import LogoImage from '../assets/logo.png';
import api, { saveToken } from '../service/api';
import { LogoStyle, ImagemStyle, Container, ErrorText } from './styles';
import { AuthContext } from '../contexts/auth';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
  setIsLoggedIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const authContext = React.useContext(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    setError(null);

    try {
      const response = await api.post('usuario/autenticar', {
        email: email,
        password: password,
      });
      
      saveToken(response.data.token);
      authContext.setTipoUsuario(response.data.typeUser)
      setIsLoggedIn(true);
      if (response.data.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
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
    navigation.navigate('Cadastrar Usuario');
  };

  return (
    <Container>
      <LogoStyle>
        <ImagemStyle source={LogoImage}/>
      </LogoStyle>
      <Input placeholder="Username" onChangeText={text => setEmail(text)} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button title="Login" onPress={() => handleLogin(email, password)} />
      <Button title="Registrar" onPress={handleRegistrar} />
    </Container>
  );
};

export default LoginScreen;
