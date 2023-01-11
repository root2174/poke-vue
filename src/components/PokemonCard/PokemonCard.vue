<script setup lang="ts">
  import { onBeforeMount, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Pokemon } from '../../interfaces/Pokemon';
  import { fetchPokemonDetailsByUrl } from '../../services/pokemon';
  import VueLoadImage from 'vue-load-image';

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

  const errorFetching = ref(false);
  const isLoading = ref(true);

  onBeforeMount(async () => {
    try {
      const data = await fetchPokemonDetailsByUrl(props.pokemon.url);
      pokemonData.imgUrl = data.sprites.front_default;
      pokemonData.id = data.id;
      isLoading.value = false;
    } catch (ex) {
      errorFetching.value = true;
    }
  });
</script>

<template>
  <div
    class="pokemon-card"
    @click="redirectToDetailsPage"
    v-if="!errorFetching && !isLoading"
  >
    <vue-load-image>
      <template v-slot:image>
        <img :src="pokemonData.imgUrl" />
      </template>
      <template v-slot:preloader>
        <img src="../../assets/spinner.gif" class="spinner" />
      </template>
      <template v-slot:error>Image load fails</template>
    </vue-load-image>
    <div>
      {{ pokemon.name }}
    </div>
  </div>
  <div v-else>Try again later...</div>
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

  .spinner {
    width: 50px;
    height: 50px;
  }
</style>
