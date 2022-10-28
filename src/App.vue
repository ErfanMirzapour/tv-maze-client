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
   <RouterView v-slot="{ Component }" class="mt-28 mb-6 container px-6 mx-auto">
      <template v-if="Component">
         <div v-if="errorMessage" class="h-screen place-content-center grid">
            <span class="text-red">{{ errorMessage }}</span>
            <button @click="refresh" class="underline">Refresh</button>
         </div>

         <Suspense v-else :timeout="0">
            <template #fallback> Loading... </template>

            <component :is="Component"></component>
         </Suspense>
      </template>
   </RouterView>
</template>
