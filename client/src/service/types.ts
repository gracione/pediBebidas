export const ADM: string = '1';

export interface EstabelecimentoComEndereco {
    nome: string;
    rua: string;
    numero: string;
    bairro: string;
    complementar: string;
    latitude: string;
    longitude: string;
}

export interface ProdutosInterface {
    nome: string;
    valor: number;
}

export interface Estabelecimento {
    id: number;
    nome: string;
}
