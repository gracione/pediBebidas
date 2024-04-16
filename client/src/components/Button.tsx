import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styled } from "styled-components/native";

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<StyledButtonProps> = ({ title, ...props }) => {
  return (
    <ButtonContainer {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  height: 40px;
  border-color: #6e3030;
  border: 0.2px;
  padding-left: 10px;
  margin-bottom: 10px;
  background-color: #ec4646;
  width: 350px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
`;

export default Button;
