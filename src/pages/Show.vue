<script setup lang="ts">
import { h } from 'vue';
import { useRoute } from 'vue-router';

import Endpoints from '@/endpoints';
import { fetchPlus, transformYears } from '@/utils';
import type { Show } from '@/types';
import { ShowCard } from '@/components';

const route = useRoute();

const show: Show = await fetchPlus(`${Endpoints.SHOWS}/${route.params.showId}`);

const years = transformYears(show.premiered, show.ended);

const additionalProperties = [
   ['Average RuntimeLanguage', show.averageRuntime],
   ['Language', show.language],
   ['Website', show.officialSite],
   ['Type', show.type],
   ['Web Channel', show.webChannel?.name],
];

const ShowProperty = (props: { name: string; value: string }) => {
   return props.value
      ? h('li', [h('b', props.name), `: ${props.value}`])
      : null;
};
</script>

<template>
   <article>
      <div class="flex items-center mb-4">
         <h1 class="text-3xl inline-block font-bold mb-0">
            {{ show?.name }}
         </h1>
         <span v-if="years" class="text-xl ml-2">({{ years }})</span>
      </div>
      <ShowCard :show="show" solo />

      <h2 class="text-2xl font-bold mt-16 mb-3">Additional Information</h2>
      <section>
         <ul class="list-inside">
            <ShowProperty
               v-for="[name, value] in additionalProperties"
               :key="name"
               :name="name"
               :value="value"
            />
         </ul>
      </section>
   </article>
</template>

<style scoped>
li::marker {
   content: '- ';
}
</style>
