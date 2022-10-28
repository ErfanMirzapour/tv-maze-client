<script setup lang="ts">
import { useRoute } from 'vue-router';
import Endpoints from '@/endpoints';
import { fetchPlus } from '@/utils';
import type { Show } from '@/types';

const route = useRoute();

const show: Show = await fetchPlus(`${Endpoints.SHOWS}/${route.params.showId}`);
</script>

<template>
   <div>
      {{ show?.name }}
   </div>
</template>
