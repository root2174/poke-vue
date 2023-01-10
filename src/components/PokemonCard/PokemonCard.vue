<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { Pokemon } from '../../interfaces/Pokemon';
  import api from '../../services/api';

  const props = defineProps<{
    pokemon: Pokemon;
  }>();

  const pokemonData = reactive({
    imgUrl: '',
    id: null,
  });

  onBeforeMount(async () => {
    const res = await api.get(props.pokemon.url);
    const data = res.data;
    pokemonData.imgUrl = data.sprites.front_default;
    pokemonData.id = data.id;
  });
</script>

<template>
  <div>
    <img :src="pokemonData.imgUrl" />
    <div>
      {{ pokemon.name }}
    </div>
  </div>
</template>
