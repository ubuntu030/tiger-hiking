import { forwardRef, useImperativeHandle } from 'react';
import FormField from '../../common/FormField';
import InputField from '../../common/InputField';
import { useContactUsForm } from './useContactUsForm';

export interface ContactFormHandle {
  submit: () => boolean;
}

const ContactUsForm = forwardRef<ContactFormHandle, object>((_props, ref) => {
  const { formData, errors, setErrors, handleChange, validate, resetForm } =
    useContactUsForm();

  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return false;
        }
        alert(
          `表單已提交:\n姓名: ${formData.name}\n郵件: ${formData.email}\n訊息: ${formData.message}`
        );
        resetForm();
        return true;
      },
    }),
    [formData, validate, setErrors, resetForm]
  );

  return (
    <div className="space-y-6">
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
      <FormField label="您的訊息" htmlFor="message" error={errors.message}>
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
    </div>
  );
});

ContactUsForm.displayName = 'ContactUsForm';

export default ContactUsForm;
