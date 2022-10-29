<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Show } from '@/types';
import { computed } from 'vue';
import { ShowCard } from '.';

const props = defineProps<{
   show: Show;
}>();

const years = computed(() => {
   const premiered = props.show.premiered;
   const ended = props.show.ended;

   if (!props.show.premiered) return null;

   const getYear = (dateString: string | null) => dateString?.split('-')[0];

   const premieredYear = getYear(premiered);
   const endedYear = getYear(ended);

   if (premieredYear === endedYear) return premieredYear;
   return `${premieredYear}–${endedYear || ''}`;
});
</script>

<template>
   <article class="flex">
      <RouterLink
         :to="{ name: 'show', params: { showId: show.id } }"
         class="inline-block"
      >
         <img
            :src="show.image?.medium"
            alt=""
            class="h-64 object-cover mr-3 hover:blur-[2px] transition"
         />
      </RouterLink>

      <div class="flex flex-col space-y-2">
         <span class="font-bold">{{ show.name }}</span>
         <span v-if="years">{{ years }}</span>
         <span v-if="show.rating.average" class="text-xs">
            <span class="font-bold text-base">{{ show.rating.average }}</span>
            /10
         </span>
         <span>{{ show.genres.join(', ') }}</span>
         <span v-if="show.network">Network: {{ show.network.name }}</span>
         <div class="!mt-auto flex gap-2">
            <a
               v-if="show.externals.imdb"
               :href="`https://imdb.com/title/${show.externals.imdb}`"
               target="_blank"
               aria-label="IMDb"
            >
               <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANeSURBVHgBrVfNS1RRFP/d9+6baZw0FUUdQ5vCSiKkRRgt2tSiTRAEtqmgSCOqXS1yYdHGbfgHRK1qGdKij0UFgkpFZCkEQptASElRGacZ593e14z33Y/3ntGB4d137jm/c9455557hqxPdJYBGPgf5KLY29IADdS2HCDOjwlSKp64D40M4daKfSMWhGB7RIRnFVPzAUZNmEFtjCnARYMMshEGOXK8c4R3QGdcNBqXmqhU8XucjKECZ1WF6guLAVRgSFHV7Bk6Z2NDXwUnGhlRnyiMMP8UqJV4UF1YVTlXyfPOChGlSmNivlR1oOIxjZMRtRGugTijKuOqd5UTolwQEUMLxMKCEojosIghHjlNjdCaUMB4NVXEkxcbyGYsDJ418fBp0ePvrEtj7E4aVx+swg5kR2814O7Yagi8p8vC8OUsxp5t4PP3PzjQnca9wbrwqZBqgNuY/2lj/F0BrU1pnDmR9dYuWbSEoXMUz98Wasq3LzVg/L3/3tGyAwtLvrO5VgOTMyW8nizgeJ8LXienN4ig1Ad06SxvbuLTnP6meXQ/g55uy1uvrIX3Zn/YmPhSBiEs7AT4VqzKU0Apyw/Uy8kKUikKSuXSsZnpyMlt5eNcCf0XF3D6xi+MPt6QbGy1Yl3Hc6hpVwqZNMXUTAH53A6YplkzDL2aR33707g+UO+t30wXwyeMxM0BAXLaYtjdbmBtvYSuDofNkJhSlCHXEnwn41IQqgH+yCiOlG0T9Ob9NLS3UNE/WSGKpBQYiO/7Du3p8Auwp0vOlauyvFbB4m+mNMiYmu/+qDdCxTjuVm93u1vhRezLWSEMBO5cGF6u8fd2Mkx/9dcfZsv4Nu8fz7ZmGlaE2AccOnrIwsi1Rq/oevMGRoYaUZ+1cLIfDt/EkYMmhq/UgzndqK2ZePs85TspBk5ZMA2KY4ctpydQLC5XsLRSwc3zGSnaxBlKK4gqRt19zjvOt2kW8RRxmTgTJqihmmHVBaW7hoWjx+tFlTSirlGlU3FOQN6PDr14A0ZFKcKI9uMiHRBnAg2AxEs6KzDeAd1sl6TwNMCRJLXiqEJKMhlx16tShyhkpVMQ9UUM+nkPCfhMsZZSIAoSxVr3/Jd6CYgqBZlGMe7LSAI5QcYI/QlhmvV2KC4aLCzzF4m8LBmeladHAAAAAElFTkSuQmCC"
                  alt="IMDb"
                  class="w-6 rounded"
               />
            </a>
            <a :href="show.url" aria-label="TVMaze" target="_blank">
               <img
                  src="https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg"
                  alt="TVMaze"
                  class="w-6 rounded"
               />
            </a>
         </div>
      </div>
   </article>
</template>
