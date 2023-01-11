<script setup lang="ts">
  import { FetchPokemonDetails } from '../../services/pokemon';

  const props = defineProps<{
    pokemonDetails: FetchPokemonDetails | null;
  }>();

  function getPokemonHeightInCm() {
    if (!props.pokemonDetails) {
      return;
    }

    return parseInt(props.pokemonDetails.height) * 10;
  }

  function getPokemonWeightinKg() {
    if (!props.pokemonDetails) {
      return;
    }

    return parseInt(props.pokemonDetails.weight) * 0.1;
  }
</script>

<template>
  <div class="container" v-if="pokemonDetails">
    <img :src="pokemonDetails?.sprites.front_default" />
    <div><b>Name:</b> {{ pokemonDetails?.name }}</div>
    <div class="info">
      <div><b>Height:</b> {{ getPokemonHeightInCm() }} cm</div>
      <div><b>Weight:</b> {{ getPokemonWeightinKg() }} kg</div>
      <div>
        <b>Stats:</b>
        <div v-for="stat in pokemonDetails?.stats">
          <span>{{ stat.stat.name }}</span
          >:
          {{ stat.base_stat }}
        </div>
      </div>
      <div>
        <b>Types:</b>
        <div v-for="type in pokemonDetails?.types">
          <span>{{ type.type.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 650px;
    max-height: 480px;
    margin: 2rem auto;
    padding: 2rem;

    display: flex;
    align-items: center;
    flex-direction: column;

    box-shadow: 0 0 20px 8px #d0d0d0;
    border-radius: 4rem;
  }

  span {
    text-transform: capitalize;
  }

  img {
    height: 180px;
    width: 180px;
  }

  .info {
    margin-top: 2rem;
    display: grid;
    row-gap: 1rem;
    column-gap: 5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 750px) {
    .container {
      box-shadow: none;
      border-radius: none;
    }
  }
</style>
