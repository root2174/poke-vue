<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { fetchPokemon } from '../../services/pokemon';
  import { computedAsync } from '@vueuse/core';
  import PokemonList from '../../components/PokemonList/PokemonList.vue';

  const offset = ref(0);
  const limit = 20;
  const evaluating = ref(false);

  const pokemons = computedAsync(
    async () => {
      return await fetchPokemon(offset.value);
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
  <PokemonList v-if="!evaluating" :pokemons="pokemonData" />
  <button @click="onPrevious" :disabled="isPreviousDisabled">PREV</button>
  <button @click="onNext" :disabled="isNextDisabled">NEXT</button>
</template>

<style></style>
