import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";

interface Produto {
  nome: string;
  valor: string;
}

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Estabelecimento: React.FC<NavbarProps> = () => {
  const Produto: any = {
    1: { nome: "coca", valor: "12.00" },
    2: { nome: "pepsi", valor: "10.00" },
  };

  const [idsProdutos, setIdsProdutos] = useState<{
    [key: number]: { quantidade: number };
  }>({});

  const adicionarProduto = (idProduto: number) => {
    setIdsProdutos((prevIdsProdutos) => ({
      ...prevIdsProdutos,
      [idProduto]: {
        quantidade: (prevIdsProdutos[idProduto]?.quantidade || 0) + 1,
      },
    }));
  };

  const [valorTotal, setValorTotal] = useState(0);
  useEffect(() => {
    let valorProdutos = 0;
    const chaves = Object.keys(idsProdutos);
    chaves.forEach((idProduto) => {
      const quantidade = idsProdutos[idProduto].quantidade;
      const nome = Produto[idProduto].nome;
      const valor = Produto[idProduto].valor;
      valorProdutos += valor * quantidade;
    });
    setValorTotal(valorProdutos);
  }, [idsProdutos]);

  return (
    <Container>
      <ScrollView>
        {Object.keys(Produto).map((key: string) => (
          <TouchableOpacity key={key}>
            <Card>
              <CardText>{Produto[key].nome}</CardText>
              <FontAwesome5
                name="cart-plus"
                size={24}
                color="black"
                onPress={() => adicionarProduto(key)}
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TextInput>{valorTotal.toFixed(2)}</TextInput>
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
