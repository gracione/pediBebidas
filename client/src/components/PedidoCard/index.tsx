import React from "react";
import styled from "styled-components/native";

interface Pedido {
  tpSituacao: string;
  valor: number;
}

interface PedidoCardProps {
  pedido: Pedido;
}

export const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  return (
    <Card>
      <Title>{pedido.tpSituacao}</Title>
      <Value>{pedido.valor}</Value>
    </Card>
  );
};

export default PedidoCard;

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
