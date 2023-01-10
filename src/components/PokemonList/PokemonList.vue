<script setup lang="ts">
  import { Pokemon } from '../../interfaces/Pokemon';
  import PokemonCard from '../PokemonCard/PokemonCard.vue';

  defineProps<{
    pokemons: Pokemon[] | null;
  }>();
</script>

<template>
  <div class="pokemon-container">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
    />
  </div>
</template>

<style>
  .pokemon-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
