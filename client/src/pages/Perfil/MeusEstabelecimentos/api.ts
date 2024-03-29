import api from "../../../service/api";
import { EstabelecimentoComEndereco } from "./types";

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
