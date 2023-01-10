<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { fetchPokemon } from '../../services/pokemon';
  import { computedAsync } from '@vueuse/core';
  import PokemonList from '../../components/PokemonList/PokemonList.vue';

  const offset = ref(0);
  const limit = 16;
  const evaluating = ref(false);

  const pokemons = computedAsync(
    async () => {
      return await fetchPokemon(offset.value, limit);
    },
    { count: 0, next: null, previous: null, results: [] },
    evaluating
  );

  const pokemonData = computed(() => pokemons.value.results);
  const isPreviousDisabled = computed(() => pokemons.value.previous === null);
  const isNextDisabled = computed(() => pokemons.value.next === null);

  function onPrevious() {
    offset.value -= limit;
  }

  function onNext() {
    offset.value += limit;
  }
</script>

<template>
  <div class="home">
    <button
      class="prevButton"
      @click="onPrevious"
      :disabled="isPreviousDisabled"
    >
      &blacktriangleleft;
    </button>
    <PokemonList :pokemons="pokemonData" :is-loading="evaluating" />
    <button class="nextButton" @click="onNext" :disabled="isNextDisabled">
      &blacktriangleright;
    </button>
  </div>
</template>

<style>
  .home {
    display: flex;
    align-items: center;
    margin: 0 5rem 0 5rem;
  }
  button {
    background-color: crimson;
    color: #fff;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    height: 3.5rem;
    width: 5rem;
    transition: all 1s;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  button:disabled:hover {
    background-color: gray;
    cursor: not-allowed;
  }

  button:hover {
    background-color: darkred;
  }

  @media screen and (max-width: 875px) {
    .home {
      display: flex;
      flex-direction: column;
      margin: 0 0 1rem 0;
    }

    .prevButton {
      order: 3;
      margin-bottom: 1rem;
    }

    .nextButton {
      order: 4;
    }
  }
</style>
