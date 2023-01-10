import { Pokemon } from '../../interfaces/Pokemon';
import api from '../api';

export interface FetchPokemonData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Pokemon[];
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface FetchPokemonDetails {
  weight: string;
  height: string;
  stats: Stats[];
  sprites: {
    front_default: string;
  };
  name: string;
  types: Type[];
  id: number;
}

export async function fetchPokemon(offset: number, limit: number = 20) {
  const res = await api.get<FetchPokemonData>(
    `/pokemon?offset=${offset}&limit=${limit}`
  );
  return res.data;
}

export async function fetchPokemonDetailsById(id: number | string) {
  const res = await api.get<FetchPokemonDetails>(`/pokemon/${id}`);
  return res.data;
}

export async function fetchPokemonDetailsByUrl(url: string) {
  const res = await api.get<FetchPokemonDetails>(url);
  return res.data;
}
