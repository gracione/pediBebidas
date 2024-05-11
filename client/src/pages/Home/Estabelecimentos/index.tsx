import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import InputSearch from '@components/InputSearch';
import api from '@service/api';
import { Estabelecimento } from '@service/types';
import { Container, CardEstabelecimento, CardContent, CardText, CardImage, CardAberto, CardDistancia } from './style';
import * as Location from 'expo-location';

interface NavbarProps {
    navigation: any;
    setIdEstabelecimento: any;
}

export const Estabelecimentos: React.FC<NavbarProps> = ({ navigation, setIdEstabelecimento }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const estabelecimentoData = async () => {
            try {
                const response = await api.get('estabelecimento');
                setEstabelecimentos(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                Alert.alert('Erro ao carregar endereço. Por favor, tente novamente mais tarde.');
                setLoading(false);
            }
        };

        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permissão para acessar a localização foi negada.');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                console.log(location);
                setLocation(location);
            } catch (error) {
                setErrorMsg('Erro ao obter a localização: ' + (error as Error).message);
            }
        };

        getLocation();
        estabelecimentoData();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    function navegar(idEstabelecimento: number) {
        setIdEstabelecimento(idEstabelecimento);
        navigation.navigate('FazerPedido', { id: idEstabelecimento });
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading, please wait...</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Container>
            <InputSearch placeholder="Pesquisar" value={searchQuery} onChangeText={handleSearch} />
            <ScrollView>
                {estabelecimentos.map((estabelecimento) => (
                    <TouchableOpacity
                        key={estabelecimento.id}
                        onPress={() => {
                            navegar(estabelecimento.id);
                        }}>
                        <CardEstabelecimento>
                            <CardImage url={estabelecimento.url ?? ''} />
                            <CardContent>
                                <CardText>{estabelecimento.nome}</CardText>
                                <CardDistancia>7 km</CardDistancia>
                                <CardAberto>Aberto</CardAberto>
                            </CardContent>
                        </CardEstabelecimento>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Container>
    );
};
