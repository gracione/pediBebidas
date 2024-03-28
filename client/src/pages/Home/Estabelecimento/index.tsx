import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import api, {fetchProdutosByEstabelecimento} from "../../../service/api";
import { ProdutosInterface } from "../../../service/types";

interface Produto {
  nome: string;
  valor: string;
}

interface NavbarProps {
  navigation: NativeStackNavigationProp<any>;
}

const Estabelecimento: React.FC<NavbarProps> = ({ navigation, idEstabelecimento }) => {
  const [Produtos, setResponse] = useState<ProdutosInterface[]>([]);


  interface Item {
      id: number;
      idEstabelecimento: number;
      idImagem: number | null;
      nome: string;
      valor: string;
  }



  const fetchData = async () => {
    try {
      const response = await fetchProdutosByEstabelecimento(idEstabelecimento);
      setResponse(response);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro ao carregar produtos. Por favor, tente novamente mais tarde."
      );
    }
  };
  fetchData();

  const [idsProdutos, setIdsProdutos] = useState<{ [key: number]: { quantidade: number } }>({});

  const adicionarProduto = (idProduto: number) => {
    // console.log(typeof idProduto);

    setIdsProdutos((prevIdsProdutos) => ({
      ...prevIdsProdutos,
      [idProduto]: {
        quantidade: (prevIdsProdutos[idProduto]?.quantidade || 0) + 1,
      },
    }));
  };

  const calcularValorTotal = () => {
    let valorProdutos = 0;
    let vetor: {[key: string]: Item} = {};
  
    Produtos.map(item => {
      vetor[item.id] = item;
    });
  
    Object.keys(idsProdutos).forEach((idProduto) => {
      const quantidade = idsProdutos[idProduto].quantidade;
      if (vetor[idProduto]) {
        const valor = parseFloat(vetor[idProduto].valor);
        valorProdutos += valor * quantidade;
      } else {
        console.error(`Produto com id ${idProduto} não encontrado.`);
      }
    });
  
    return valorProdutos.toFixed(2);
  };
  
  useEffect(() => {
    setValorTotal(calcularValorTotal());
  }, [idsProdutos]);

  const [valorTotal, setValorTotal] = useState<string>("0.00");

  const fazerPedido = async ():Promise<any> =>{
    await api.post('pedido', {pedidos:idsProdutos, valor:valorTotal});
  }
  
  return (
    <Container>
      <ScrollView>

        {Object.keys(Produtos).map((key: string) => (
          <TouchableOpacity key={key} >
            <Card>
              <CardText>
                <>{Produtos[key].nome}</>  
                <>{Produtos[key].valor} R$</>
                </CardText>
              <FontAwesome5 name="cart-plus" size={24} color="black" onPress={() => adicionarProduto(Produtos[key].id)} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ButtonContainer>
        <TouchableOpacity onPress={fazerPedido}>
          <PedidoButton>Fazer Pedido</PedidoButton>
        </TouchableOpacity>
        <TextInput editable={false} value={`Total: R$ ${valorTotal}`} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Card = styled.View`
  background-color: #a3c2a0;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const PedidoButton = styled.Text`
  background-color: #2ecc71;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
`;

export default Estabelecimento;
