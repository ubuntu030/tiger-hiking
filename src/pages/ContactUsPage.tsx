import { Mail, MapPin, Phone, Send } from 'lucide-react';
import theme from '../constants/theme';
import Button from '../components/common/Button';
import PageTitle from '../components/layout/PageTitle';
import FormField from '../components/common/FormField';
import InputField from '../components/common/InputField';
import { useState } from 'react';

interface ErrorMessages {
  name?: string;
  email?: string;
  message?: string;
}

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<ErrorMessages>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors && errors[name as keyof ErrorMessages]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: ErrorMessages = {};
    if (!formData.name.trim()) {
      newErrors.name = '姓名為必填欄位';
    }
    if (!formData.email.trim()) {
      newErrors.email = '電子郵件為必填欄位';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '電子郵件格式不正確';
    }
    if (!formData.message.trim()) {
      newErrors.message = '訊息為必填欄位';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(
        `表單已提交:\n姓名: ${formData.name}\n郵件: ${formData.email}\n訊息: ${formData.message}`
      );
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="您的姓名" htmlFor="name" error={errors.name}>
              <InputField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="請輸入您的姓名"
                error={!!errors.name}
              />
            </FormField>
            <FormField label="電子郵件" htmlFor="email" error={errors.email}>
              <InputField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="請輸入您的電子郵件"
                error={!!errors.email}
              />
            </FormField>
            <FormField
              label="您的訊息"
              htmlFor="message"
              error={errors.message}
            >
              <InputField
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="請在此輸入您的訊息..."
                error={!!errors.message}
              />
            </FormField>
            <Button type="submit" className="w-full" onClick={() => {}}>
              <Send className="w-5 h-5 mr-2 inline-block" />
              送出訊息
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
