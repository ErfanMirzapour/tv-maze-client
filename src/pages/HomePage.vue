<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Endpoints from '@/endpoints';
import { Pagination } from '@/components';
import { fetch } from '@/utils';

const fetchShows = (page = '1') =>
   fetch(`${Endpoints.SHOWS}?page=${page}`).then(async res => {
      console.time('Deserializing data');
      const json = await res.json();
      console.timeEnd('Deserializing data');

      return json;
   });

const loading = ref(false);
const shows = ref(await fetchShows());

const route = useRoute();

watch(
   () => route.query.page,
   async page => {
      loading.value = true;
      shows.value = await fetchShows(page as string);
      loading.value = false;
   },
);
</script>

<template>
   <main class="static">
      <span v-if="loading">Loading inside...</span>
      <ul v-else>
         <li v-for="show in shows" :key="show.id">
            <RouterLink :to="{ name: 'show', params: { showId: show.id } }">
               {{ show.name }}
            </RouterLink>
         </li>
      </ul>

      <footer
         class="fixed inset-0 top-auto bg-white z-10 shadow-2xl py-4 flex justify-center"
      >
         <Pagination :pages-count="10" />
      </footer>
   </main>
</template>
