export default async (url: string, init?: RequestInit | undefined) => {
   const res = await fetchPlus(import.meta.env.VITE_BASE_API_URL + url, init);

   if (!res.ok) throw res;

   console.time('Deserializing data');
   const json = await res.json();
   console.timeEnd('Deserializing data');

   return json;
};
