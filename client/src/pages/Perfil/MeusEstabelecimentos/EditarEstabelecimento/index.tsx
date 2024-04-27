import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import api from '@service/api';

interface Estabelecimento {
    id: number;
    nome: string;
}

interface EditarEstabelecimentoProps {
    route: {
        params: {
            id: string;
        };
    };
}

export const EditarEstabelecimento: React.FC<EditarEstabelecimentoProps> = ({ route }) => {
    const { id } = route.params;
    const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);

    const handleSalvarEdicao = async () => {
    };

    useEffect(() => {
        const fetchEstabelecimento = async () => {
            try {
                const response = await api.get(`estabelecimento/${id}`);
                setEstabelecimento(response.data);
            } catch (error) {
                console.error('Erro ao buscar estabelecimento:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar o estabelecimento.');
            }
        };
        console.log(estabelecimento);
        fetchEstabelecimento();
    }, [id]);

    const [nomeEditado, setNomeEditado] = useState('');

    return (
        <View>
            <Text>{estabelecimento?.nome}</Text>
            <TextInput value={estabelecimento?.nome} onChangeText={(text) => setNomeEditado(text)} />

            <Button title="Salvar" onPress={handleSalvarEdicao} />
        </View>
    );
};
