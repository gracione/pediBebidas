import React, { useState, useEffect } from "react";
import { Button, Alert, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EstabelecimentoComEndereco } from "./types";
import { fetchEstabelecimentos, saveEstabelecimento } from "./api";
import { Container, FormContainer, StyledTextInput, Card } from "./style";

const MeusEstabelecimentos: React.FC = () => {
  const [estabelecimento, setEstabelecimento] = useState<EstabelecimentoComEndereco>({
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
    complementar: "",
    latitude: "",
    longitude: "",
  });
  const [response, setResponse] = useState<EstabelecimentoComEndereco[]>([]);
  const [addEndereco, setAddEndereco] = useState(false);

  useEffect(() => {
    fetchData();
  }, [addEndereco]);

  const fetchData = async () => {
    try {
      const response = await fetchEstabelecimentos();
      setResponse(response);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao carregar endereço. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleChange = (field: keyof EstabelecimentoComEndereco, value: string) => {
    setEstabelecimento({ ...estabelecimento, [field]: value });
  };

  const handleSave = async () => {
    try {
      await saveEstabelecimento(estabelecimento);
      Alert.alert("Endereço salvo com sucesso!");
      setAddEndereco(false);
      setEstabelecimento({
        nome: "",
        rua: "",
        numero: "",
        bairro: "",
        complementar: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorsMessages = error.response.data.errors;
      let messages = "";
      errorsMessages.forEach((element: any) => {
        messages += element.message + "\n";
      });
      Alert.alert(messages);
    } else {
      console.log(error);
      Alert.alert(
        "Erro ao salvar endereço. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <Container>
      {addEndereco ? (
        <FormContainer>
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
        </FormContainer>
      ) : (
        <>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color="black"
            onPress={() => setAddEndereco(true)}
          />

          {response.map((estabelecimentoF, index) => (
            <Card key={index}>
              <Text>{estabelecimentoF.nome}</Text>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default MeusEstabelecimentos;
