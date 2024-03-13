import api from "../../../service/api";
import { Estabelecimento } from "./types";

export const fetchEstabelecimentos = async (): Promise<Estabelecimento[]> => {
  try {
    const response = await api.get("estabelecimento-por-usuario");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveEstabelecimento = async (estabelecimento: Estabelecimento): Promise<void> => {
  try {
    await api.post("estabelecimento", estabelecimento);
  } catch (error) {
    throw error;
  }
};
