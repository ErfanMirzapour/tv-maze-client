<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { ArrowLeft, Magnifier } from './icons';

const route = useRoute();

const showBack = computed(() => route.name !== 'home');
const showSearch = computed(() => route.name !== 'search');
</script>

<template>
   <header class="py-6 shadow-lg fixed inset-0 bottom-auto bg-white z-10">
      <nav class="flex container mx-auto px-6">
         <RouterLink v-if="showBack" :to="{ name: 'home' }">
            <ArrowLeft />
         </RouterLink>
         <RouterLink v-if="showSearch" :to="{ name: 'search' }" class="ml-auto">
            <Magnifier class="mt-1" />
         </RouterLink>
      </nav>
   </header>
</template>
