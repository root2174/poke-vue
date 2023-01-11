<script setup lang="ts">
  import { Pokemon } from '../../interfaces/Pokemon';
  import PokemonCard from '../PokemonCard/PokemonCard.vue';

  defineProps<{
    pokemons: Pokemon[] | undefined;
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
    grid-template-columns: repeat(4, 1fr);
    row-gap: 2rem;
    column-gap: 4rem;
    margin: 2rem auto;
  }

  @media screen and (max-width: 1290px) {
    .pokemon-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 760px) {
    .pokemon-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 500px) {
    .pokemon-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
