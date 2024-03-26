import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InputSearch from "../../components/InputSearch";
import styled from "styled-components/native"; // Import styled-components for React Native
import api from "../../service/api";
import Estabelecimento from "./Estabelecimento";

const Stack = createNativeStackNavigator();
interface NavbarProps {
  navigation: any;
  setIdEstabelecimento: any;
}

interface Estabelecimento {
  id: number;
  nome: string;
}

const Estabelecimentos: React.FC<NavbarProps> = ({ navigation, setIdEstabelecimento }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);

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
    navigation.navigate("Estabelecimento", { id: idEstabelecimento });
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
              navegar(estabelecimento.id)
            }}
          >
            <Card>
              <CardText>{estabelecimento.nome}</CardText>
            </Card>
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
            <Estabelecimentos {...props} setIdEstabelecimento={setIdEstabelecimento} />
            )}
        </Stack.Screen>
        <Stack.Screen name="Estabelecimento">
          {(props) => (
            <Estabelecimento {...props} idEstabelecimento={idEstabelecimento} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Card = styled.View`
  background-color: #c5c5c5;
  border-radius: 8px;
  margin: 4px 30px;
  padding: 15px 30px;
`;

const CardText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export default Home;
