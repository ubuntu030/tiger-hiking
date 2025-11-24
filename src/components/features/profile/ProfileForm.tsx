import { useProfileForm } from "./useProfileForm";
import FormField from "../../common/FormField";
import InputField from "../../common/InputField";
import RadioGroupField from "../../common/RadioGroupField";
import Button from "../../common/Button";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const { formData, errors, loading, error, handleChange, handleSubmit } =
    useProfileForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      toast.success("個人資料更新成功！");
    } else {
      // 錯誤訊息可以由 useMutation 的 onError 或 try-catch 處理
      // 這裡只是一個通用提示
      toast.error("資料更新失敗，請檢查您的輸入。");
    }
  };

  if (loading && !formData.email) {
    // 初始載入時顯示
    return <div>讀取中...</div>;
  }

  if (error) {
    return <div>讀取資料時發生錯誤: {error.message}</div>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RadioGroupField
          label="性別"
          name="gender"
          selectedValue={formData.gender}
          onChange={handleChange}
          options={[
            { label: "男性", value: "MALE" },
            { label: "女性", value: "FEMALE" },
          ]}
          error={errors.gender}
        />
        <FormField label="生日" htmlFor="birthDate" error={errors.birthDate}>
          <InputField
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            error={!!errors.birthDate}
          />
        </FormField>
      </div>

      <RadioGroupField
        label="國籍"
        name="nationality"
        selectedValue={formData.nationality}
        onChange={handleChange}
        options={[
          { label: "本國人", value: "local" },
          { label: "外國人", value: "foreign" },
        ]}
        error={errors.nationality}
      />

      <FormField label="電子郵件" htmlFor="email" error={errors.email}>
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          disabled // Email is usually not editable
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="身分證或護照號碼"
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
        <FormField
          label="手機"
          htmlFor="phoneNumber"
          error={errors.phoneNumber}
        >
          <InputField
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
          />
        </FormField>
      </div>

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
          htmlFor="emergencyContactPhone"
          error={errors.emergencyContactPhone}
        >
          <InputField
            id="emergencyContactPhone"
            name="emergencyContactPhone"
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            error={!!errors.emergencyContactPhone}
          />
        </FormField>
      </div>

      <FormField
        label="登山經歷簡述"
        htmlFor="hikingExperience"
        error={errors.hikingExperience}
      >
        <InputField
          id="hikingExperience"
          name="hikingExperience"
          rows={5}
          maxLength={500}
          value={formData.hikingExperience}
          onChange={handleChange}
          error={!!errors.hikingExperience}
        />
      </FormField>
      <Button type="submit" disabled={loading}>
        {loading ? "儲存中..." : "儲存變更"}
      </Button>
    </form>
  );
};

export default ProfileForm;
