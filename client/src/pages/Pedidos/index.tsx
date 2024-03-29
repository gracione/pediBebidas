import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import styled from "styled-components/native";
import api from "../../service/api";

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("pedido/usuario");
        setPedidos(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erro ao carregar pedidos. Por favor, tente novamente mais tarde."
        );
      }
    };

    fetchData();
  }, []);

  console.log(pedidos);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {pedidos.map((pedido, index) => (
          <Card key={index}>
            <Title>{pedido.tpSituacao}</Title>
            <Value>{pedido.valor}</Value>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default Pedidos;

const Card = styled.View`
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  width: 90%;
  elevation: 3; /* Sombra para Android */
  shadow-color: #000; /* Sombra para iOS */
  shadow-opacity: 0.2; /* Sombra para iOS */
  shadow-radius: 3px; /* Sombra para iOS */
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Value = styled.Text`
  font-size: 16px;
`;
