import { useMemo, useState } from 'react';

interface PaginationOptions {
  itemsPerPage: number;
}

/**
 * A custom hook to handle pagination logic. It takes a list of items
 * and returns the paginated data along with pagination controls.
 *
 * @param items - The full list of items to be paginated.
 * @param options - Pagination options, including itemsPerPage.
 * @returns An object containing pagination state and data for the current page.
 */
export const usePagination = <T>(
  items: T[],
  options: PaginationOptions
) => {
  const { itemsPerPage } = options;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  };
};