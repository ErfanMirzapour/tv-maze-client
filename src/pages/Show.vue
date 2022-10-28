<script setup lang="ts">
import { useRoute } from 'vue-router';
import Endpoints from '@/endpoints';
import { fetch } from '@/utils';

const route = useRoute();

const response = await fetch(`${Endpoints.SHOWS}/${route.params.showId}`);
const show = await response.json();
// });
</script>

<template>
   <div>
      {{ show?.name }}
   </div>
</template>
