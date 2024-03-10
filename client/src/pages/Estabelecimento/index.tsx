import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native"; // Import styled-components for React Native

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Estabelecimento: React.FC<NavbarProps> = () => {
  let produtos = [
    { nome: "coca", valor: "12,00 R$" },
    { nome: "pepsi", valor: "10,00 R$" },
  ];

  return (
    <Container>
      <ScrollView>
        {produtos.map((produto, index) => (
          <TouchableOpacity key={index}>
            <Card>
              <CardText>{produto.nome}</CardText>
              <FontAwesome5
                name="cart-plus"
                size={24}
                color="black"
                onPress={() => console.log(produto.nome)}
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
