<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };
</script>

<template>
  <header>
    <img @click="goToHome" src="../../assets/logo.svg" class="logo" />
  </header>
</template>

<style scoped>
  header {
    height: 8rem;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
