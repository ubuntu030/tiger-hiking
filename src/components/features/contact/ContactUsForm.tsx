import type {
  ContactFormData,
  ContactFormErrors,
} from "../../../hooks/useContactUs";
import FormField from "../../common/FormField";
import InputField from "../../common/InputField";

interface ContactUsFormProps {
  formData: ContactFormData;
  errors: ContactFormErrors;
  loading: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ContactUsForm = ({
  formData,
  errors,
  loading,
  handleChange,
}: ContactUsFormProps) => {
  return (
    <div className="space-y-6">
      {errors.form && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {errors.form}
        </div>
      )}
      <FormField label="您的姓名" htmlFor="name" error={errors.name}>
        <InputField
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="請輸入您的姓名"
          disabled={loading}
          maxLength={20}
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
          disabled={loading}
          maxLength={30}
          error={!!errors.email}
        />
      </FormField>
      <FormField label="您的訊息" htmlFor="message" error={errors.message}>
        <InputField
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="請在此輸入您的訊息..."
          disabled={loading}
          maxLength={1000}
          error={!!errors.message}
        />
      </FormField>
    </div>
  );
};

export default ContactUsForm;
