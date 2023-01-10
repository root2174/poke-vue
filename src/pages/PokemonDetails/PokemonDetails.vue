<script setup lang="ts">
  import { computedAsync } from '@vueuse/core';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import PokemonDetailsCard from '../../components/PokemonDetailsCard/PokemonDetailsCard.vue';
  import { fetchPokemonDetailsById } from '../../services/pokemon';
  import Spinner from '../../components/Spinner/Spinner.vue';

  const route = useRoute();
  const evaluating = ref(true);

  const pokemonData = computedAsync(
    async () => {
      return await fetchPokemonDetailsById(`${route.params.id}`);
    },
    null,
    evaluating
  );
</script>

<template>
  <div class="container">
    <PokemonDetailsCard v-if="!evaluating" :pokemon-details="pokemonData" />
    <Spinner v-else />
  </div>
</template>

<style>
  .container {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    align-items: column;
    height: 80vh;
    width: 100%;
    overflow-y: hidden;
  }
</style>
