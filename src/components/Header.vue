<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const showBack = computed(() => route.name === 'show');
</script>

<template>
   <header>
      <h1>header</h1>
      <RouterLink v-if="showBack" :to="{ name: 'home' }">back</RouterLink>
   </header>
</template>
