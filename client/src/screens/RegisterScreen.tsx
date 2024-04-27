import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '@service/api';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

const ErrorText = styled.Text`
  color: red;
  margin: 10px;
`;

const RegisterScreen: React.FC = () => {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('000');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complementar, setComplementar] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!nome || !email || !dateOfBirth || !rua || !numero || !bairro || !latitude || !longitude) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
    } else if (password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
    } else if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
    } else {
      setError(null);
      try {
        const response = await api.post('usuario', 
        {
          nome:nome,
          telefone:telefone,
          email:email,
          password:password,
          data_nascimento:dateOfBirth,
          rua:rua,
          numero:numero,
          bairro:bairro,
          complementar:complementar,
          latitude:latitude,
          longitude:longitude,
        }	);
        console.log(response);
        Alert.alert('Sucesso', `Registro realizado com sucesso!\nData de cadastro: ${dateOfBirth.toISOString().split('T')[0]}`);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error);
        } else {
          console.error('Erro ao processar a requisição:', error.message);
        }
      }
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <Container>
      <Input
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text onPress={showDatepicker} style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        {dateOfBirth.toISOString().split('T')[0] || 'Data de Nascimento'}
      </Text>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
            <Input
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
        keyboardType="numeric"
      />

      <Input
        placeholder="Rua"
        value={rua}
        onChangeText={(text) => setRua(text)}
      />
      <Input
        placeholder="Número"
        value={numero}
        onChangeText={(text) => setNumero(text)}
        keyboardType="numeric"
      />
      <Input
        placeholder="Bairro"
        value={bairro}
        onChangeText={(text) => setBairro(text)}
      />
      <Input
        placeholder="Complementar"
        value={complementar}
        onChangeText={(text) => setComplementar(text)}
      />
      <Input
        placeholder="Latitude"
        value={latitude}
        onChangeText={(text) => setLatitude(text)}
        keyboardType="numeric"
      />
      <Input
        placeholder="Longitude"
        value={longitude}
        onChangeText={(text) => setLongitude(text)}
        keyboardType="numeric"
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button title="Registrar" onPress={handleRegister} />
    </Container>
  );
};

export default RegisterScreen;
