import { useQuery } from 'vue-query';
import { fetchPokemon } from '../services/pokemon';

export function usePokemonQuery(offset: number) {
  console.log('CALLED');
  return useQuery(['fetchPokemons', offset], () => fetchPokemon(offset), {
    keepPreviousData: true,
  });
}
