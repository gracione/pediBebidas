import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView, Alert } from "react-native";
import InputSearch from "../../../components/InputSearch";
import api from "../../../service/api";
import { Container, CardEstabelecimento, CardContent, CardText, CardImage, CardAberto, CardFechado, CardDistancia } from "./style";
import * as Location from 'expo-location';

interface NavbarProps {
  navigation: any;
  setIdEstabelecimento: any;
}

interface Estabelecimento {
  id: number;
  nome: string;
}

export const Estabelecimentos: React.FC<NavbarProps> = ({
    navigation,
    setIdEstabelecimento,
  }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("estabelecimento");
          setEstabelecimentos(response.data);
        } catch (error) {
          console.error(error);
          Alert.alert(
            "Erro ao carregar endereço. Por favor, tente novamente mais tarde."
          );
        }
      };

      const getLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permissão para acessar a localização foi negada.');
            return; // Retornar para evitar a execução do código abaixo em caso de permissão negada
          }
        
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        } catch (error) {
          setErrorMsg('Erro ao obter a localização: ' + (error as Error).message);
        }
      };  
  
      console.log(location);
      getLocation();
      fetchData();
    }, []);
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
    function navegar(idEstabelecimento: number) {
      setIdEstabelecimento(idEstabelecimento);
      navigation.navigate("FazerPedido", { id: idEstabelecimento });
    }
    return (
      <Container>
        <InputSearch
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <ScrollView>
          {estabelecimentos.map((estabelecimento) => (
            <TouchableOpacity
              key={estabelecimento.id}
              onPress={() => {
                navegar(estabelecimento.id);
              }}
            >
              <CardEstabelecimento>
                <CardImage url={estabelecimento.url ?? ""} />
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
