import api from "../../../service/api";
import { EstabelecimentoComEndereco } from "@service/types";

export const fetchEstabelecimentos = async (): Promise<EstabelecimentoComEndereco[]> => {
  try {
    const response = await api.get("estabelecimento-por-usuario");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveEstabelecimento = async (estabelecimento: EstabelecimentoComEndereco): Promise<void> => {
  try {
    await api.post("estabelecimento", estabelecimento);
  } catch (error) {
    throw error;
  }
};

export const update = async (tabela: string, dados: any): Promise<void> => {
  try {
    await api.post(tabela, dados);
  } catch (error) {
    throw error;
  }
};
