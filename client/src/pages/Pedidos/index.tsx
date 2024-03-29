import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import api from "../../service/api";
import PedidoCard from "./../../components/PedidoCard";

interface Pedido {
  id: string;
  tpSituacao: string;
  valor: number;
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("pedido/usuario");
        setPedidos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar pedidos. Por favor, tente novamente mais tarde.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled(Container)`
  /*css para padronizar*/
`;

const ErrorContainer = styled(Container)`
  /*css para padronizar*/
`;

const ErrorText = styled.Text`
  /*css para padronizar*/
`;

export default Pedidos;
