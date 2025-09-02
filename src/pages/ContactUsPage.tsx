import { Mail, MapPin, Phone } from "lucide-react";
import Button from "../components/common/Button";
import PageTitle from "../components/layout/PageTitle";
import theme from "../constants/theme";
import { useContactUs } from "../hooks/useContactUs";
import ContactUsForm from "../components/features/contact/ContactUsForm";

const ContactUsPage = () => {
  const { formData, errors, loading, handleChange, submit } = useContactUs();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(); // 直接呼叫 submit，hook 會處理後續的通知
  };

  return (
    <div>
      <PageTitle
        title="聯繫我們"
        subtitle="有任何問題或合作提案？歡迎隨時與我們聯繫！"
      />
      <div
        className={`max-w-4xl mx-auto grid md:grid-cols-2 gap-12 p-8 rounded-lg shadow-lg ${theme.cardBg}`}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">聯絡資訊</h2>
          <p className="flex items-start">
            <MapPin className="w-6 h-6 mr-4 mt-1 text-green-800 flex-shrink-0" />
            <span>110 台北市信義區信義路五段7號 (台北101)</span>
          </p>
          <p className="flex items-center">
            <Phone className="w-6 h-6 mr-4 text-green-800" />
            <span>(02) 8101-8888</span>
          </p>
          <p className="flex items-center">
            <Mail className="w-6 h-6 mr-4 text-green-800" />
            <span>service@hike-taiwan.com</span>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">傳送訊息給我們</h2>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} noValidate>
              <ContactUsForm
                formData={formData}
                errors={errors}
                loading={loading}
                handleChange={handleChange}
              />

              <div className="mt-8 flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "傳送中..." : "送出訊息"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
