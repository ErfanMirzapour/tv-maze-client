<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import { RouterView } from 'vue-router';
import { Header } from '@/components';

const errorMessage = ref<string | null>(null);

onErrorCaptured(e => {
   errorMessage.value = e.message;
});

const refresh = () => {
   window.location.reload();
};
</script>

<template>
   <Header />
   <RouterView v-slot="{ Component }">
      <template v-if="Component">
         <template v-if="errorMessage">
            <span>{{ errorMessage }}</span>
            <button @click="refresh">Refresh</button>
         </template>

         <Suspense v-else :timeout="0">
            <template #fallback> Loading... </template>

            <component :is="Component"></component>
         </Suspense>
      </template>
   </RouterView>
</template>
