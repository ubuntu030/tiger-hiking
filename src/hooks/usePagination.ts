import { useState, useMemo, useCallback } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const limit = initialLimit;

  const offset = useMemo(
    () => (currentPage - 1) * limit,
    [currentPage, limit],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    offset,
    limit,
    handlePageChange,
  };
};