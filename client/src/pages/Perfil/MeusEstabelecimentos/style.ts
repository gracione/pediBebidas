import styled from "styled-components/native";
import { View, TextInput } from "react-native";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const FormContainer = styled(View)`
  width: 100%;
`;

export const StyledTextInput = styled(TextInput)`
  border: solid;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin: 5px 20px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
`;

export const Card = styled.View`
  background-color: #9b9c9b;
  border-radius: 8px;
  width: 90%;
  padding: 15px 20px;
  margin: 3px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 90%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
`;