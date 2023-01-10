import { Pokemon } from '../../interfaces/Pokemon';
import api from '../api';

export interface FetchPokemonData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Pokemon[];
}

export async function fetchPokemon(offset: number, limit: number = 20) {
  const res = await api.get<FetchPokemonData>(
    `/pokemon?offset=${offset}&limit=${limit}`
  );
  return res.data;
}
