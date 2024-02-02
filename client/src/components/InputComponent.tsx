import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { styled } from 'styled-components/native';

interface InputComponentProps extends TextInputProps {}

const InputComponent: React.FC<InputComponentProps> = (props) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.TextInput`
  height: 40px;
  border-color: #000000;
  border-width: 1px;
  padding-left: 10px;
  margin-bottom: 10px;
  width: 150px;
`;

export default InputComponent;
