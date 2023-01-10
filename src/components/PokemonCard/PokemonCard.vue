<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Pokemon } from '../../interfaces/Pokemon';
  import { fetchPokemonDetailsByUrl } from '../../services/pokemon';

  const props = defineProps<{
    pokemon: Pokemon;
  }>();

  const pokemonData = reactive({
    imgUrl: '',
    id: 0,
  });

  const router = useRouter();

  function redirectToDetailsPage() {
    router.push(`pokemon/${pokemonData.id}`);
  }

  onBeforeMount(async () => {
    const data = await fetchPokemonDetailsByUrl(props.pokemon.url);
    if (!data) {
      return;
    }
    pokemonData.imgUrl = data.sprites.front_default;
    pokemonData.id = data.id;
  });
</script>

<template>
  <div class="pokemon-card" @click="redirectToDetailsPage">
    <img :src="pokemonData.imgUrl" />
    <div>
      {{ pokemon.name }}
    </div>
  </div>
</template>

<style>
  .pokemon-card {
    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 0 0 20px 8px #d0d0d0;
    border-radius: 4px;

    min-width: 200px;

    cursor: pointer;
  }
</style>
