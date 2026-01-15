import { useState, useEffect } from "react";
import FormField from "../components/common/FormField";
import InputField from "../components/common/InputField";
import PageTitle from "../components/layout/PageTitle";
import theme from "../constants/theme";
import { useFAQs } from "../hooks/useFAQs";
import useDebounce from "../hooks/useDebounce";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/common/Pagination";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    currentPage,
    offset,
    limit,
    totalPages,
    handlePageChange,
    setTotalPages,
  } = usePagination(1, 10);

  const { faqs, loading, error, totalCount } = useFAQs(
    debouncedSearchTerm,
    limit,
    offset,
  );

  useEffect(() => {
    if (totalCount !== undefined) {
      setTotalPages(totalCount > 0 ? Math.ceil(totalCount / limit) : 0);
    }
  }, [totalCount, limit, setTotalPages]);

  useEffect(() => {
    handlePageChange(1);
  }, [debouncedSearchTerm, handlePageChange]);

  return (
    <div>
      <PageTitle
        title="常見問題"
        subtitle="為您解答關於行程、報名與裝備的各種疑問"
      />

      <div
        className={`p-6 rounded-lg ${theme.cardBg} shadow-sm mb-8 grid grid-cols-1 gap-6`}
      >
        <FormField label="公告搜尋" htmlFor="faqContext">
          <InputField
            id="faqContext"
            name="faqContext"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋公告標題及內容..."
          />
        </FormField>
      </div>

      {loading && (
        <div className="text-center py-16">
          <p className={theme.textPrimary}>載入中，請稍候...</p>
        </div>
      )}

      {error && (
        <p className="text-center text-red-500">
          資料載入失敗：{error.message}
        </p>
      )}
      {!loading && !error && (
        <>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs?.map((faq) => (
              <details
                key={faq.id}
                className={`p-4 rounded-lg ${theme.cardBg} shadow-sm group`}
              >
                <summary
                  className={`font-bold text-lg cursor-pointer list-none flex justify-between items-center ${theme.textPrimary}`}
                >
                  {faq.q}
                  <span className="transform transition-transform duration-300 group-open:rotate-180">
                    &darr;
                  </span>
                </summary>
                <p className={`mt-4 ${theme.textSecondary}`}>{faq.a}</p>
              </details>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default FAQPage;
