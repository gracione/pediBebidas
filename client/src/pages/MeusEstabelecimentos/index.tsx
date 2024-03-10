import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import api from "../../service/api";
import { Ionicons } from "@expo/vector-icons";

const MeusEstabelecimentos: React.FC = () => {
  const [estabelecimento, setEstabelecimento] = useState({
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
    complementar: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("estabelecimento");
        const { data } = response;
        setEstabelecimento(data);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erro ao carregar endereço. Por favor, tente novamente mais tarde."
        );
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setEstabelecimento({ ...estabelecimento, [field]: value });
  };

  const handleSave = async () => {
    try {
      const response = await api.post("estabelecimento", estabelecimento);
      Alert.alert("Endereço salvo com sucesso!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const errorsMessages = error.response.data.errors;
        let messages = "";
        errorsMessages.forEach((element) => {
          messages += element.message + "\n";
        });
        Alert.alert(messages);
      } else {
        console.log(error);
        Alert.alert(
          "Erro ao salvar endereço. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <Container>
      <Ionicons name="add-circle-outline" size={24} color="black" />
      <StyledTextInput
        onChangeText={(text) => handleChange("nome", text)}
        placeholder="Nome"
      />
      <StyledTextInput
        onChangeText={(text) => handleChange("rua", text)}
        placeholder="Rua"
      />
      <StyledTextInput
        onChangeText={(text) => handleChange("numero", text)}
        placeholder="Número"
        keyboardType="numeric"
      />
      <StyledTextInput
        onChangeText={(text) => handleChange("bairro", text)}
        placeholder="Bairro"
      />
      <StyledTextInput
        onChangeText={(text) => handleChange("complementar", text)}
        placeholder="Complemento"
      />
      <StyledTextInput
        onChangeText={(text) => handleChange("latitude", text)}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <StyledTextInput
        onChangeText={(text) => handleChange("longitude", text)}
        placeholder="Longitude"
        keyboardType="numeric"
      />
      <Button title="Salvar" onPress={handleSave} />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  width: 80%;
  height: 40px;
  padding: 10px;
  margin: 5px 20px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
`;

export default MeusEstabelecimentos;
