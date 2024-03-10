import React from "react";
import { TextInput, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styled } from "styled-components/native";
import { Octicons } from '@expo/vector-icons';

interface InputSearchProps extends TouchableOpacityProps {
  searchQuery: string;
  handleSearch: (text: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ searchQuery, handleSearch, ...props }) => {
  return (
    <ButtonSearchContainer {...props}>
      <TextInput
        style={{ flex: 1 }}
        placeholder="Pesquisar"
        value={searchQuery}
        onChangeText={handleSearch}
        testID="input" // Changed 'id' to 'testID'
      />
      <Octicons
        name="search"
        size={24}
        color="black"
      />
    </ButtonSearchContainer>
  );
};

const ButtonSearchContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 14px;
  border: solid;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 10px 30px;
`;

export default InputSearch;
