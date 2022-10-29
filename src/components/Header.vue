<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { ArrowLeft, Magnifier } from './icons';

const route = useRoute();

// const showBack = computed(() => route.name !== 'home');
const showSearch = computed(() => route.name !== 'search');
</script>

<template>
   <header
      class="py-6 shadow-lg fixed inset-0 bottom-auto bg-white z-10 dark:bg-zinc-800"
   >
      <nav class="flex container mx-auto px-6">
         <RouterLink :to="{ name: 'home' }" aria-label="Back">
            <img
               src="https://static.tvmaze.com/images/tvm-header-logo.png"
               alt="Logo"
               class="h-8"
            />
            <!-- <ArrowLeft /> -->
         </RouterLink>
         <RouterLink
            v-if="showSearch"
            :to="{ name: 'search' }"
            class="ml-auto"
            aria-label="Search"
         >
            <Magnifier class="mt-1" />
         </RouterLink>
      </nav>
   </header>
</template>
