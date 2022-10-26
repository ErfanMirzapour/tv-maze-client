<script setup lang="ts">
import Endpoints from '@/endpoints';
import { RouterLink } from 'vue-router';
import { fetch } from '../utils';

const response = await fetch(Endpoints.SHOWS);
const shows = await response.json();
</script>

<template>
   <main>
      <ul>
         <li v-for="show in shows" :key="show.id">
            <RouterLink :to="{ name: 'show', params: { showId: show.id } }">
               {{ show.name }}
            </RouterLink>
         </li>
      </ul>
   </main>
</template>
