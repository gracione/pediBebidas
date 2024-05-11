import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Input } from 'react-native-elements';
import api from '@service/api';
import Button from '@components/Button';
import { Estabelecimento } from '@service/types';

const CadastrarProduto: React.FC = () => {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<Estabelecimento[]>('estabelecimento');
                setEstabelecimentos(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Erro ao carregar estabelecimentos. Por favor, tente novamente mais tarde.');
            }
        };

        fetchData();
    }, []);

    const handleCadastro = async () => {
        if (!nome || !valor || !selectedEstabelecimento) {
            Alert.alert('Por favor, preencha todos os campos.');
            return;
        }
        console.log(
{          nome,
          valor,
          id_estabelecimento: selectedEstabelecimento}
)
        const response = await api.post('produto', {
            nome,
            valor,
            id_estabelecimento: selectedEstabelecimento,
        });
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');

        setNome('');
        setValor('');
        setSelectedEstabelecimento(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Produto</Text>
            <Input placeholder="Nome" value={nome} onChangeText={(text) => setNome(text)} inputContainerStyle={styles.input} />
            <Input placeholder="Valor" value={valor} onChangeText={(text) => setValor(text)} inputContainerStyle={styles.input} />
            <SelectList
                setSelected={(val) => setSelectedEstabelecimento(val as number)}
                data={estabelecimentos.map((estab) => ({
                    key: estab.id,
                    value: estab.nome,
                }))}
                save="key"
                style={styles.input}
            />
            <Button title="Cadastrar" onPress={handleCadastro} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        width: '100%',
    },
    button: {
        marginTop: 20,
        width: '100%',
    },
});

export default CadastrarProduto;
