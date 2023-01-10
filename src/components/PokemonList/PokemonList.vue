<script setup lang="ts">
  import { Pokemon } from '../../interfaces/Pokemon';
  import PokemonCard from '../PokemonCard/PokemonCard.vue';

  defineProps<{
    pokemons: Pokemon[] | null;
    isLoading: boolean;
  }>();
</script>

<template>
  <div class="pokemon-container">
    <PokemonCard
      v-if="!isLoading"
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
    />
  </div>
</template>

<style>
  .pokemon-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 2rem;
    column-gap: 4rem;
    margin: 3rem auto;
  }

  @media screen and (max-width: 1290px) {
    .pokemon-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 875px) {
    .pokemon-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
