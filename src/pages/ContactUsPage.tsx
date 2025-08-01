import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import Button from '../components/common/Button';
import ContactUsForm, {
  type ContactFormHandle,
} from '../components/features/contact/ContactUsForm';
import PageTitle from '../components/layout/PageTitle';
import { useToast } from '../hooks/useToast';
import theme from '../constants/theme';

const ContactUsPage = () => {
  const formRef = useRef<ContactFormHandle>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSendMessage = async () => {
    // Trigger the submit method exposed by ContactUsForm via the ref
    if (!formRef.current || isSubmitting) return;

    const isFormValid = formRef.current.submit();
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 模擬 API 呼叫，延遲 1.5 秒
      // --- 正常情況 ---
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // --- 模擬失敗情況 (您可以取消註解此行來測試錯誤提示) ---
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Simulated API Error')), 1500)
      );

      showToast('您的訊息已成功送出，我們會盡快與您聯繫！', 'success');
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('訊息送出失敗，請稍後再試。', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
            <ContactUsForm ref={formRef} />
            <Button
              className="w-full"
              onClick={handleSendMessage}
              isLoading={isSubmitting}
            >
              <Send className="w-5 h-5 mr-2 inline-block" />
              送出訊息
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
