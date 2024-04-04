import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InputSearch from "../../components/InputSearch";
import styled from "styled-components/native";
import api from "../../service/api";
import { FazerPedido } from "./FazerPedido";

const Stack = createNativeStackNavigator();
interface NavbarProps {
  navigation: any;
  setIdEstabelecimento: any;
}

interface Estabelecimento {
  id: number;
  nome: string;
}

const Estabelecimentos: React.FC<NavbarProps> = ({
  navigation,
  setIdEstabelecimento,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("estabelecimento");
        setEstabelecimentos(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erro ao carregar endereço. Por favor, tente novamente mais tarde."
        );
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  function navegar(idEstabelecimento: number) {
    setIdEstabelecimento(idEstabelecimento);
    navigation.navigate("FazerPedido", { id: idEstabelecimento });
  }
  return (
    <Container>
      <InputSearch
        placeholder="Pesquisar"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView>
        {estabelecimentos.map((estabelecimento) => (
          <TouchableOpacity
            key={estabelecimento.id}
            onPress={() => {
              navegar(estabelecimento.id);
            }}
          >
            <CardEstabelecimento>
              <CardImage url={estabelecimento.url ?? ""} />
              <CardContent>
                <CardText>{estabelecimento.nome}</CardText>
                <CardDistancia>7 km</CardDistancia>
                <CardAberto>Aberto</CardAberto>
              </CardContent>
            </CardEstabelecimento>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
};

const Home: React.FC = () => {
  const [idEstabelecimento, setIdEstabelecimento] = useState<number>(0);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {(props) => (
            <Estabelecimentos
              {...props}
              setIdEstabelecimento={setIdEstabelecimento}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FazerPedido">
          {(props) => (
            <FazerPedido {...props} idEstabelecimento={idEstabelecimento} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

const Container = styled.View`
  flex: 1;
`;

const CardEstabelecimento = styled.View`
  background-color: #c1bee4;
  display: flex;
  margin: 1% 6%;
  padding: 1%;
  flex-direction: row;
  justify-content: space-between;
`;

const CardContent = styled.View`
  margin: 10px;
  width: 80%;
`;

const CardText = styled.Text`
  color: #6b0e0e;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  text-transform: capitalize;
`;

const CardImage = styled.Image`
  font-size: 16px;
  font-weight: bold;
  border: saddlebrown;
  width: 20%;
  height: 100%;
  border-radius: 45px;
`;

const CardAberto = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const CardFechado = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const CardDistancia = styled.Text`
  /* Adicionar estilos conforme necessário */
`;

export default Home;
