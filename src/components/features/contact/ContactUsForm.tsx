import { forwardRef, useImperativeHandle } from 'react';
import FormField from '../../common/FormField';
import InputField from '../../common/InputField';
import { useContactUs } from '../../../hooks/useContactUs';

export interface ContactFormHandle {
  submit: () => Promise<boolean>;
}

const ContactUsForm = forwardRef<ContactFormHandle, object>((_props, ref) => {
  const { formData, errors, loading, handleChange, submit } = useContactUs();

  useImperativeHandle(
    ref,
    () => ({
      submit: async () => {
        // Prevent multiple submissions while loading
        if (loading) return false;
        return await submit();
      },
    }),
    [submit, loading]
  );

  return (
    <div className="space-y-6">
      {errors.form && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{errors.form}</div>}
      <FormField label="您的姓名" htmlFor="name" error={errors.name}>
        <InputField
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="請輸入您的姓名"
          disabled={loading}
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
          error={!!errors.message}
        />
      </FormField>
    </div>
  );
});

ContactUsForm.displayName = 'ContactUsForm';

export default ContactUsForm;
