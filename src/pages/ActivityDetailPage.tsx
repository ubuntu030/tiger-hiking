import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import theme from "../constants/theme";
import Dialog from "../components/common/Dialog";
import { useRef, useState } from "react";
import RegistrationForm from "../components/features/registration/RegistrationForm";
import type { RegistrationFormHandle } from "../components/features/registration/RegistrationForm";
import { useToast } from "../hooks/useToast";
import { format } from "date-fns";
import { useActivityDetail } from "../hooks/useActivityDetail";
import { useCreateRegistration } from "../hooks/useCreateRegistration";

const ActivityDetailPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const { activity, loading, error, refetch } = useActivityDetail(
    activityId || ""
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<RegistrationFormHandle | null>(null);
  const { showToast } = useToast();
  const { createRegistration, loading: isSubmitting } = useCreateRegistration();

  const handleConfirmRegistration = async () => {
    const formData = formRef.current?.submit();
    if (formData && activityId) {
      try {
        const result = await createRegistration({
          ...formData,
          activityId: parseInt(activityId, 10),
        });

        if (result.data?.createRegistration.success) {
          setIsModalOpen(false);
          showToast("報名成功！感謝您的參與。", "success");
          formRef.current?.reset(); // 成功後重設表單
          refetch(); // 重新獲取活動資料以更新報名人數
        } else {
          // 處理後端回傳的業務邏輯錯誤 (例如：名額已滿)
          const errorMessage =
            result.data?.createRegistration.message || "報名失敗，請檢查資料。";
          showToast(errorMessage, "error");
        }
      } catch (apiError) {
        // 錯誤通知已在 useCreateRegistration hook 中處理
        console.error("Registration failed:", apiError);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className={theme.textPrimary}>載入中，請稍候...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p>讀取活動時發生錯誤：{error.message}</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h1 className="text-2xl font-bold mb-4">404 - 找不到活動</h1>
        <p className={`${theme.textSecondary} mb-6`}>
          您要找的活動可能已經不存在或被移動了。
        </p>
        <Button to="/">回到首頁</Button>
      </div>
    );
  }

  const isRegistrationOpen = activity.status === "報名登記";

  return (
    <div>
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-2">{activity.name}</h1>
          <p className={`text-lg ${theme.textSecondary} mb-6`}>
            {format(new Date(activity.startDate), "yyyy-MM-dd")} -{" "}
            {format(new Date(activity.endDate), "yyyy-MM-dd")}
          </p>
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-auto rounded-xl shadow-lg mb-8"
          />
          <div className="space-y-8 prose max-w-none">
            <h2 className="text-2xl font-bold border-b-2 border-green-800 pb-2">
              活動描述
            </h2>
            <p>{activity.description}</p>
            <h2 className="text-2xl font-bold border-b-2 border-green-800 pb-2">
              交通與接駁資訊
            </h2>
            <p>{activity.transport}</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div
            className={`p-6 rounded-xl shadow-lg sticky top-24 ${theme.cardBg}`}
          >
            <h2 className="text-2xl font-bold mb-6">報名資訊</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${theme.textSecondary}`}>
                  隨行人員
                </span>
                <span className="text-right">
                  {activity.guides.leader}(領隊), {activity.guides.guide}(嚮導),
                  {activity.guides.sweeper}(押隊)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${theme.textSecondary}`}>
                  報名人數
                </span>
                <div>
                  <span className={`${theme.accent} font-bold`}>
                    {activity.currentRegistrations}
                  </span>
                  <span className="text-sm"> / {activity.maxSlots}</span>
                </div>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2.5">
                <div
                  className={`${theme.primary} h-2.5 rounded-full`}
                  style={{
                    width: `${
                      (activity.currentRegistrations / activity.maxSlots) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="pt-4 space-y-4">
                {activity.plans.map((plan, index) => (
                  <div key={plan.name}>
                    <div className="flex justify-between items-baseline">
                      <span className={`font-semibold ${theme.textSecondary}`}>
                        {plan.name}
                      </span>
                      <span
                        className={`font-bold ${
                          index === 0 ? "text-2xl" : "text-xl"
                        } ${theme.accent}`}
                      >
                        NT$ {plan.price.toLocaleString()}
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textSecondary} text-right`}>
                      {plan.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <Button
                onClick={() => setIsModalOpen(true)}
                disabled={!isRegistrationOpen}
                className="w-full text-lg"
              >
                {isRegistrationOpen ? "立即報名申請" : "報名截止"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRegistration}
        isConfirming={isSubmitting}
        title={`報名活動：${activity.name}`}
      >
        <RegistrationForm ref={formRef} plans={activity.plans} />
      </Dialog>
    </div>
  );
};
export default ActivityDetailPage;
