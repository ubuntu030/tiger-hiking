import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { theme } from '../constants/theme';
import Button from '../components/common/Button';
import PageTitle from '../components/layout/PageTitle';

const ContactUsPage = () => (
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
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              姓名
            </label>
            <input
              type="text"
              id="name"
              placeholder="您的姓名"
              className={`w-full p-3 border ${theme.border} rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              電子郵件
            </label>
            <input
              type="email"
              id="email"
              placeholder="您的電子郵件"
              className={`w-full p-3 border ${theme.border} rounded-md`}
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              訊息
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="您的訊息..."
              className={`w-full p-3 border ${theme.border} rounded-md`}
            ></textarea>
          </div>
          <Button type="submit" className="w-full" onClick={() => {}}>
            <Send className="w-5 h-5 mr-2 inline-block" />
            送出訊息
          </Button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactUsPage;
