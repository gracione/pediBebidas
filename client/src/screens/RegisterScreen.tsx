import React, { useState } from 'react';
import { View, Alert, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

const RegisterButton = styled.Button`
  margin-top: 10px;
`;

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !dateOfBirth) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
    } else if (password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
    } else if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
    } else {
      Alert.alert('Sucesso', `Registro realizado com sucesso!\nData de Nascimento: ${dateOfBirth.toISOString().split('T')[0]}`);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: Event, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <Container>
      <Input
        placeholder="Nome"
        value={name}
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
      <Button title="Registrar" onPress={handleRegister} />
    </Container>
  );
};

export default RegisterScreen;
