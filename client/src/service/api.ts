import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333/',
});

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token salvo com sucesso!');
  } catch (error) {
    console.log('Erro ao salvar o token:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('Token recuperado com sucesso:', token);
      return token;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token removido com sucesso!');
  } catch (error) {
    console.log('Erro ao remover o token:', error);
  }
};

export default api;