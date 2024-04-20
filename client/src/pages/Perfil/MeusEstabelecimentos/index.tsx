import React, { useState, useEffect } from 'react';
import { Button, Alert, Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EstabelecimentoComEndereco } from './types';
import { fetchEstabelecimentos, saveEstabelecimento } from './api';
import { Container, FormContainer, StyledTextInput, Card } from './style';
import MapView, { Marker, Region } from 'react-native-maps';
import { EditarEstabelecimento } from './EditarEstabelecimento';

interface Location {
    latitude: number;
    longitude: number;
}

const MeusEstabelecimentos: React.FC = ({ navigation }) => {
    const [estabelecimento, setEstabelecimento] =
        useState<EstabelecimentoComEndereco>({
            nome: '',
            rua: '',
            numero: '',
            bairro: '',
            complementar: '',
            latitude: '',
            longitude: '',
        });

    const [response, setResponse] = useState<EstabelecimentoComEndereco[]>([]);
    const [addEndereco, setAddEndereco] = useState(false);

    useEffect(() => {
        fetchData();
    }, [addEndereco]);

    const fetchData = async () => {
        try {
            const response = await fetchEstabelecimentos();
            setResponse(response);
        } catch (error) {
            console.error(error);
            Alert.alert(
                'Erro ao carregar endereço. Por favor, tente novamente mais tarde.'
            );
        }
    };

    const handleChange = (
        field: keyof EstabelecimentoComEndereco,
        value: string
    ) => {
        setEstabelecimento({ ...estabelecimento, [field]: value });
    };

    const handleSave = async () => {
        try {
            await saveEstabelecimento(estabelecimento);
            Alert.alert('Endereço salvo com sucesso!');
            setAddEndereco(false);
            setEstabelecimento({
                nome: '',
                rua: '',
                numero: '',
                bairro: '',
                complementar: '',
                latitude: '',
                longitude: '',
            });
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error: any) => {
        if (
            error.response &&
            error.response.data &&
            error.response.data.errors
        ) {
            const errorsMessages = error.response.data.errors;
            let messages = '';
            errorsMessages.forEach((element: any) => {
                messages += element.message + '\n';
            });
            Alert.alert(messages);
        } else {
            console.log(error);
            Alert.alert(
                'Erro ao salvar endereço. Por favor, tente novamente mais tarde.'
            );
        }
    };

    const handleMapPress = (event: {
        nativeEvent: { coordinate: { latitude: number; longitude: number } };
    }) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setEstabelecimento((prevEstabelecimento) => ({
            ...prevEstabelecimento,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        }));
    };

    const handleEstabelecimentoPress = (id: string) => {
        navigation.navigate('EditarEstabelecimento', { id });
    };

    return (
        <Container>
            {addEndereco ? (
                <FormContainer>
                    <StyledTextInput
                        onChangeText={(text) => handleChange('nome', text)}
                        placeholder="Nome"
                    />
                    <StyledTextInput
                        onChangeText={(text) => handleChange('rua', text)}
                        placeholder="Rua"
                    />
                    <StyledTextInput
                        onChangeText={(text) => handleChange('numero', text)}
                        placeholder="Número"
                        keyboardType="numeric"
                    />
                    <StyledTextInput
                        onChangeText={(text) => handleChange('bairro', text)}
                        placeholder="Bairro"
                    />
                    <StyledTextInput
                        onChangeText={(text) =>
                            handleChange('complementar', text)
                        }
                        placeholder="Complemento"
                    />
                    <Text>Escolha a localização</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -17.3920936,
                            longitude: -50.373832,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        onPress={handleMapPress}></MapView>

                    <Button title="Salvar" onPress={handleSave} />
                </FormContainer>
            ) : (
                <>
                    <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="black"
                        onPress={() => setAddEndereco(true)}
                    />

                    {response.map((estabelecimentoF, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                handleEstabelecimentoPress(estabelecimentoF.id)
                            }>
                            <Card>
                                <Text>{estabelecimentoF.nome}</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '30%',
    },
});

export default MeusEstabelecimentos;
