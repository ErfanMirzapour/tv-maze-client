<script setup lang="ts">
import type { Show } from '@/types';
import ShowCard from './ShowCard.vue';

defineProps<{ shows: Show[] }>();
</script>

<template>
   <ul class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(24rem,1fr))]">
      <li v-for="show in shows" :key="show.id">
         <ShowCard :show="show" />
      </li>
   </ul>
</template>
