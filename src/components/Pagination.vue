<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = withDefaults(
   defineProps<{
      pagesCount: number;
      /**
       * max number of pages to show in the list
       * it's better to be an odd number
       */
      size?: number;
      /**
       * query key related to this pagination
       */
      queryParam?: string;
   }>(),
   {
      size: 5,
      queryParam: 'page',
   },
);

defineEmits(['page']);

const route = useRoute();
const currentPage = computed(
   () => +(route.query[props.queryParam] as string) || 1,
);

const quickNavigation = computed(() => {
   const { value: currentPageValue } = currentPage;
   const prev = {
      query: { ...route.query, [props.queryParam]: currentPageValue - 1 },
   };
   const next = {
      query: { ...route.query, [props.queryParam]: currentPageValue + 1 },
   };

   return { prev, next };
});

const pages = computed(() =>
   Array.from({ length: props.size })
      // find near pages
      // for current 6 and max 7 would be [4, 5, 6, 7, null]
      .map((_, i) => {
         const pageNum = i - Math.floor(props.size / 2) + currentPage.value;

         return pageNum >= 1 && pageNum <= props.pagesCount ? pageNum : null;
      })
      .filter(Boolean)
      .map(pageNum => ({
         pageNum: pageNum!,
         to: {
            query: { ...route.query, [props.queryParam]: pageNum },
         },
      })),
);
</script>

<template>
   <nav
      v-if="pagesCount > 1"
      role="navigation"
      aria-label="Pages"
      class="flex items-center text-grays-300 text-3"
   >
      <RouterLink
         v-if="currentPage !== 1"
         :to="quickNavigation.prev"
         aria-label="Go to previous page"
         class="pagination-item border-none mr-1"
         @click="$emit('page', quickNavigation.prev.query[queryParam])"
      >
         &lt;
      </RouterLink>

      <template v-if="pages[0].pageNum !== 1">
         <RouterLink
            :to="{ query: { ...route.query, [queryParam]: 1 } }"
            aria-label="Go to first page"
            class="pagination-item mr-2 lg-only"
            @click="$emit('page', 1)"
         >
            1
         </RouterLink>
         <div
            v-if="pages[0].pageNum !== 2"
            class="pagination-item mr-2 border-none pointer-events-none lg-only"
            aria-hidden
         >
            ...
         </div>
      </template>

      <ul class="list-none p-0 m-0 inline-flex">
         <li
            v-for="({ pageNum, to }, i) in pages"
            :key="pageNum"
            :class="{ 'mr-2': i !== pages.length - 1 }"
         >
            <a
               v-if="pageNum === currentPage"
               aria-current="page"
               :aria-label="`Current page, ${currentPage}`"
               class="pagination-item pagination-item--active"
            >
               {{ pageNum }}
            </a>
            <RouterLink
               v-else
               :to="to"
               :aria-label="`Go to page ${pageNum}`"
               class="pagination-item"
               @click="$emit('page', to.query[queryParam])"
            >
               {{ pageNum }}
            </RouterLink>
         </li>
      </ul>

      <template v-if="pages[pages.length - 1].pageNum < pagesCount">
         <div
            v-if="pages[pages.length - 1].pageNum !== pagesCount - 1"
            class="pagination-item lg-only ml-2 border-none pointer-events-none"
            aria-hidden
         >
            ...
         </div>
         <RouterLink
            :to="{ query: { ...route.query, [queryParam]: pagesCount } }"
            aria-label="Go to last page"
            class="pagination-item lg-only ml-2"
            @click="$emit('page', pagesCount)"
         >
            {{ pagesCount }}
         </RouterLink>
      </template>

      <RouterLink
         v-if="currentPage < pagesCount"
         :to="quickNavigation.next"
         aria-label="Go to next page"
         class="pagination-item border-none ml-1"
         @click="$emit('page', quickNavigation.next.query[queryParam])"
      >
         &gt;
      </RouterLink>
   </nav>
</template>

<style scoped>
.pagination-item {
   @apply inline-flex items-center justify-center w-6 h-6 rounded-full cursor-pointer border p-4;

   &.pagination-item--active {
      @apply bg-blue-400 text-white cursor-default;
   }

   &.lg-only {
      @apply hidden lg:inline-flex;
   }
}
</style>
