import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Estabelecimento from "../Estabelecimento";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InputSearch from "../../components/InputSearch";
import styled from "styled-components/native"; // Import styled-components for React Native
import api from "../../service/api";

const Stack = createNativeStackNavigator();
interface NavbarProps {
  navigation: any;
}

const Estabelecimentos: React.FC<NavbarProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  // let estabelecimentos = ["JM Distribuidora", "Altas Horas"];

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

  return (
    <Container>
      <InputSearch
        placeholder="Pesquisar"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView>
        {estabelecimentos.map((estabelecimento, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Estabelecimento")}
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

const Home: React.FC<NavbarProps> = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {(props) => <Estabelecimentos {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Estabelecimento" component={Estabelecimento} />
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
  padding: 20px;
  margin: 4px 30px;
  padding: 15px 30px;
`;

const CardText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export default Home;
