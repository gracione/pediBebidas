import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import api, {fetchProdutosByEstabelecimento} from "../../../service/api";
import { ProdutosInterface } from "../../../service/types";

interface Produto {
  nome: string;
  valor: string;
}

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Estabelecimento: React.FC<NavbarProps> = ({ navigation, idEstabelecimento }) => {
  const Produtos: { [key: string]: Produto } = {
    "1": { nome: "Coca-Cola", valor: "12.00" },
    "2": { nome: "Pepsi", valor: "10.00" },
  };
  const [Produtos2, setResponse] = useState<ProdutosInterface[]>([]);
  console.log(idEstabelecimento);
  console.log(Produtos2);

  const fetchData = async () => {
    try {
      const response = await fetchProdutosByEstabelecimento(idEstabelecimento);
      setResponse(response);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao carregar endereço. Por favor, tente novamente mais tarde."
      );
    }
  };

  const [idsProdutos, setIdsProdutos] = useState<{ [key: string]: { quantidade: number } }>({});

  const adicionarProduto = (idProduto: string) => {
    setIdsProdutos((prevIdsProdutos) => ({
      ...prevIdsProdutos,
      [idProduto]: {
        quantidade: (prevIdsProdutos[idProduto]?.quantidade || 0) + 1,
      },
    }));
  };

  const calcularValorTotal = () => {
    let valorProdutos = 0;
    Object.keys(idsProdutos).forEach((idProduto) => {
      const quantidade = idsProdutos[idProduto].quantidade;
      const valor = parseFloat(Produtos[idProduto].valor);
      valorProdutos += valor * quantidade;
    });
    return valorProdutos.toFixed(2);
  };

  useEffect(() => {
    setValorTotal(calcularValorTotal());
  }, [idsProdutos]);

  const [valorTotal, setValorTotal] = useState<string>("0.00");

  return (
    <Container>
      <ScrollView>
        {Object.keys(Produtos).map((key: string) => (
          <TouchableOpacity key={key} >
            <Card>
              <CardText>{Produtos[key].nome}</CardText>
              <FontAwesome5 name="cart-plus" size={24} color="black" onPress={() => adicionarProduto(key)} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TextInput editable={false} value={`Total: $${valorTotal}`} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Card = styled.View`
  background-color: #a3c2a0;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export default Estabelecimento;
