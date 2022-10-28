<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash-es';
import Endpoints from '@/endpoints';
import { fetch } from '@/utils';

const inputRef = ref<HTMLInputElement>();

onMounted(() => {
   inputRef.value!.focus();
});

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const shows = ref([]);

const search = debounce(
   async (q?: string) => {
      if (!q) return;

      try {
         shows.value = await fetch(`${Endpoints.SEARCH}?q=${q}`);
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
      search(q);
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
            e => router.push({ query: { q: e.target.value || undefined } })
         "
         aria-label="Search: "
         placeholder="Type part of a title..."
         class="py-2 border rounded-xl px-4 w-80 max-w-full outline-none focus:border-blue-600 transition-colors mx-auto block"
      />

      <template v-if="route.query.q">
         <span v-if="loading">Loading inside...</span>
         <span v-else-if="!shows.length">There's no matching for this!</span>
         <ul v-else>
            <li v-for="{ show } in shows" :key="show.id">
               <RouterLink :to="{ name: 'show', params: { showId: show.id } }">
                  {{ show.name }}
               </RouterLink>
            </li>
         </ul>
      </template>
   </main>
</template>
