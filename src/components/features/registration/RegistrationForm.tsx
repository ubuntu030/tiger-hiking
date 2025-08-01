import { forwardRef, useImperativeHandle } from 'react';
import type { RegistrationFormHandle } from '../../../pages/ActivityDetailPage';
import FormField from '../../common/FormField';
import InputField from '../../common/InputField';
import RadioGroupField from '../../common/RadioGroupField';
import { useRegistrationForm } from './useRegistrationForm';

const RegistrationForm = forwardRef<RegistrationFormHandle, object>(
  (_props, ref) => {
    const { formData, errors, handleChange, validate, setErrors, resetForm } =
      useRegistrationForm();

    // Expose a submit function to the parent via the ref
    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          const validationErrors = validate();
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return false;
          }
          alert('報名資料已送出！\n' + JSON.stringify(formData, null, 2));
          resetForm();
          return true;
        },
      }),
      [formData, validate, setErrors, resetForm]
    );

    return (
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="姓名" htmlFor="name" error={errors.name}>
            <InputField
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
            />
          </FormField>
          <FormField
            label="身分證號碼"
            htmlFor="idNumber"
            error={errors.idNumber}
          >
            <InputField
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              error={!!errors.idNumber}
            />
          </FormField>
        </div>
        <FormField label="電子郵件" htmlFor="email" error={errors.email}>
          <InputField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
          />
        </FormField>
        <RadioGroupField
          label="國籍"
          name="nationality"
          selectedValue={formData.nationality}
          onChange={handleChange}
          options={[
            { label: '本國人', value: 'local' },
            { label: '外籍人士', value: 'foreign' },
          ]}
          error={errors.nationality}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="緊急聯絡人"
            htmlFor="emergencyContact"
            error={errors.emergencyContact}
          >
            <InputField
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              error={!!errors.emergencyContact}
            />
          </FormField>
          <FormField
            label="緊急聯絡人電話"
            htmlFor="emergencyPhone"
            error={errors.emergencyPhone}
          >
            <InputField
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              value={formData.emergencyPhone}
              onChange={handleChange}
              error={!!errors.emergencyPhone}
            />
          </FormField>
        </div>
        <FormField label="聯絡地址" htmlFor="address" error={errors.address}>
          <InputField
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
          />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="手機" htmlFor="mobile" error={errors.mobile}>
            <InputField
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
            />
          </FormField>
          <FormField label="市話 (選填)" htmlFor="phone">
            <InputField
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormField>
        </div>
      </form>
    );
  }
);

RegistrationForm.displayName = 'RegistrationForm';

export default RegistrationForm;
