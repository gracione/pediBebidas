import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const CardEstabelecimento = styled.View`
  background-color: #c1bee4;
  display: flex;
  margin: 1% 6%;
  padding: 1%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardContent = styled.View`
  margin: 10px;
  width: 80%;
`;

export const CardText = styled.Text`
  color: #6b0e0e;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  text-transform: capitalize;
`;

export const CardImage = styled.Image`
  font-size: 16px;
  font-weight: bold;
  border: saddlebrown;
  width: 20%;
  height: 100%;
  border-radius: 45px;
`;

export const CardAberto = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
export const CardFechado = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const CardDistancia = styled.Text`
  /* Adicionar estilos conforme necessário */
`;
