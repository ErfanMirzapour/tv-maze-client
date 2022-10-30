<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

import Endpoints from '@/endpoints';
import { fetchPlus } from '@/utils';
import type { SearchResult } from '@/types';
import { ShowList } from '@/components';

const inputRef = ref<HTMLInputElement>();

onMounted(() => {
   inputRef.value!.focus();
});

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const shows = ref<SearchResult[]>([]);

const search = debounce(
   async (q?: string) => {
      if (!q) return;

      try {
         shows.value = await fetchPlus(`${Endpoints.SEARCH}?q=${q}`);
      } finally {
         loading.value = false;
      }
   },
   500,
   { leading: false },
);

watch(
   () => route.query.q,
   q => {
      loading.value = true;
      search(q as string);
   },
   {
      immediate: true,
   },
);
</script>

<template>
   <main>
      <input
         ref="inputRef"
         type="search"
         :value="route.query.q"
         @input="
            e => router.push({ query: { q: (e.target as HTMLInputElement).value || undefined } })
         "
         aria-label="Search: "
         placeholder="Type part of a title..."
         class="py-2 border rounded-xl px-4 w-80 max-w-full outline-none focus:border-blue-600 transition-colors mx-auto block mb-8 [color-scheme:light_dark]"
      />

      <template v-if="route.query.q">
         <span v-if="loading">Loading...</span>
         <span v-else-if="!shows.length">There's no matching for this!</span>
         <ShowList v-else :shows="shows.map(show => show.show)" />
      </template>
   </main>
</template>
