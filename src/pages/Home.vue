<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Endpoints from '@/endpoints';
import { Pagination, ShowList } from '@/components';
import { fetchPlus } from '@/utils';
import type { Show } from '@/types';

const fetchShows = (page = '1') => fetchPlus(`${Endpoints.SHOWS}?page=${page}`);

const loading = ref(false);
const shows = ref<Show[]>(await fetchShows());

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
      <span v-if="loading">Loading...</span>
      <ShowList v-else :shows="shows" />

      <footer
         class="fixed inset-0 top-auto bg-white dark:bg-zinc-800 z-10 shadow-2xl py-4 flex justify-center"
      >
         <Pagination :pages-count="10" />
      </footer>
   </main>
</template>
