export default async (url: string, init?: RequestInit | undefined) => {
   const res = await fetch(import.meta.env.VITE_BASE_API_URL + url, init);

   if (!res.ok) throw res;
   return res;
};
