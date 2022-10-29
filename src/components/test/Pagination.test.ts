import { render } from '@testing-library/vue';
import { routerKey, routeLocationKey, RouterLink } from 'vue-router';

import Pagination from '../Pagination.vue';

const renderPagination = (props?: any, currentPage = 1) =>
   render(
      {
         ...Pagination,
         components: { RouterLink },
      },
      {
         props,
         global: {
            provide: {
               [routerKey as symbol]: {
                  resolve: (to: any) => ({
                     href: `/test?page=${to.query.page}`,
                     matched: [],
                  }),
                  options: {},
               },
               [routeLocationKey as symbol]: {
                  query: { page: String(currentPage) },
               },
            },
         },
      },
   );

describe('render 5 pages with current 1', () => {
   it('should render 4 links and one another anchor indicating current', () => {
      const { getAllByRole, getByLabelText } = renderPagination({
         pagesCount: 5,
      });

      getByLabelText('Current page, 1');
      // expect(currentLink).toMatchInlineSnapshot();

      const links = getAllByRole('link');

      expect(links).toHaveLength(4); // 2, 3, 5, next btn
      expect(links[0]).toHaveAccessibleName('Go to page 2');
      expect(links[1]).toHaveTextContent('3');
      expect(links[2]).toHaveAccessibleName('Go to last page');
      expect(links[3]).toHaveAccessibleName('Go to next page');
   });

   it('should not render prev and page 4 links', () => {
      const { queryByRole } = renderPagination({ pagesCount: 5 });

      const pageFourEl = queryByRole('link', { name: 'Go to page 4' });
      expect(pageFourEl).not.toBeInTheDocument();

      const prevEl = queryByRole('link', { name: 'Go to previous page' });
      expect(prevEl).not.toBeInTheDocument();
   });

   it('should generate links with correct hrefs', () => {
      const { getByLabelText, getAllByRole } = renderPagination({
         pagesCount: 5,
      });

      expect(getByLabelText('Current page, 1')).not.toHaveAttribute('href');

      const links = getAllByRole('link');

      const pageTwoLink = '/test?page=2';
      expect(links[0]).toHaveAttribute('href', pageTwoLink); // first <a> with href
      expect(links[3]).toHaveAttribute('href', pageTwoLink); // next button
   });
});

describe('render 10 pages with current 5', () => {
   it('should render 8 links and one current with currect label', () => {
      const { getAllByRole, getByLabelText } = renderPagination(
         { pagesCount: 10 },
         5,
      );

      getByLabelText('Current page, 5');

      const links = getAllByRole('link');
      expect(links).toHaveLength(8); // back, 1, 3, 4, 6, 7, 10, next
   });

   it('should render prev and next buttons', () => {
      const { getByRole } = renderPagination({ pagesCount: 10 }, 5);

      getByRole('link', { name: 'Go to previous page' });
      getByRole('link', { name: 'Go to next page' });
   });

   it('should render first and last page links', () => {
      const { getByRole } = renderPagination({ pagesCount: 10 }, 5);

      const firstEl = getByRole('link', { name: 'Go to first page' });
      expect(firstEl).toHaveTextContent('1');

      const lastEl = getByRole('link', { name: 'Go to last page' });
      expect(lastEl).toHaveTextContent('10');
   });
});
