import ProfileForm from "../../components/features/profile/ProfileForm";
import ChangePasswordForm from "../../graphql/ChangePasswordForm";

const ProfileSettingsPage = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">基本資料管理</h2>
        <ProfileForm />
        {/* <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveChanges}>儲存變更</Button>
        </div> */}
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">更改密碼</h2>
        <ChangePasswordForm />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">頭像上傳</h2>
        <p>此處將提供上傳頭像的功能。</p>
      </section>
    </div>
  );
};

export default ProfileSettingsPage;
