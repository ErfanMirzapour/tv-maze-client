export default (premiered: string | null, ended: string | null) => {
   if (!premiered) return null;

   const getYear = (dateString: string | null) => dateString?.split('-')[0];

   const premieredYear = getYear(premiered);
   const endedYear = getYear(ended);

   if (premieredYear === endedYear) return premieredYear;
   return `${premieredYear}–${endedYear || ''}`;
};
