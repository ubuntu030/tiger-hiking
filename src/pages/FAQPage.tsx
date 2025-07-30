import PageTitle from '../components/layout/PageTitle';
import { mockData } from '../constants/mockData';
import theme  from '../constants/theme';

const FAQPage = () => (
  <div>
    <PageTitle
      title="常見問題"
      subtitle="為您解答關於行程、報名與裝備的各種疑問"
    />
    <div className="max-w-3xl mx-auto space-y-4">
      {mockData.faqs.map((faq, index) => (
        <details
          key={index}
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
  </div>
);

export default FAQPage;
