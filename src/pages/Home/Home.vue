<script setup lang="ts">
  import { ref, watch, onBeforeMount } from 'vue';
  import { fetchPokemon, FetchPokemonData } from '../../services/pokemon';
  import PokemonList from '../../components/PokemonList/PokemonList.vue';
  import { Pokemon } from '../../interfaces/Pokemon';
  import Spinner from '../../components/Spinner/Spinner.vue';

  const initialPokemonLoad = 16;

  const evaluating = ref(true);
  const numPokemonsVisible = ref(initialPokemonLoad);

  const searchedPokemon = ref('');

  const pokemons = ref<FetchPokemonData>();
  const visiblePokemons = ref<Pokemon[]>();

  const errorFetching = ref(false);

  onBeforeMount(async () => {
    try {
      pokemons.value = await fetchPokemon();
      evaluating.value = false;
    } catch (ex) {
      errorFetching.value = true;
    }
  });

  watch([pokemons, numPokemonsVisible, searchedPokemon], () => {
    if (!searchedPokemon.value) {
      visiblePokemons.value = pokemons.value?.results.slice(
        0,
        numPokemonsVisible.value
      );

      return;
    }
  });

  const search = () => {
    if (!searchedPokemon.value) {
      return;
    }

    const filteredPokemon = filterPokemonByName();

    if (filteredPokemon && filteredPokemon.length > 0) {
      visiblePokemons.value = filteredPokemon;
    }
  };

  const filterPokemonByName = () => {
    return pokemons.value?.results.filter((pokemon) => {
      return pokemon.name.includes(searchedPokemon.value);
    });
  };

  const loadMore = () => {
    numPokemonsVisible.value += initialPokemonLoad;
  };
</script>

<template>
  <div class="home">
    <div class="search">
      <input v-model="searchedPokemon" />
      <button @click="search">Search</button>
    </div>
    <div>
      <PokemonList :pokemons="visiblePokemons" v-if="!evaluating" />
      <Spinner v-else />
      <div v-if="errorFetching">Try again Later...</div>
    </div>
    <button @click="loadMore" :disabled="Boolean(searchedPokemon)">
      Load More...
    </button>
  </div>
</template>

<style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5rem 1rem 5rem;
  }

  .search input {
    margin-top: 2rem;
    margin-right: 0.5rem;
  }

  button {
    cursor: pointer;
    padding: 8px 15px;
    color: white;
    background-color: crimson;
    border: none;
    border-radius: 4px;
    transition: all 1s;
  }

  button:hover {
    background-color: darkred;
  }
  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  input {
    padding: 6px;
    width: 200px;
    border-radius: 4px;
  }

  @media screen and (max-width: 875px) {
    .home {
      display: flex;
      flex-direction: column;
      margin: 0 0 1rem 0;
    }
  }
</style>
