import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import theme from "../constants/theme";
import Dialog from "../components/common/Dialog";
import { useRef, useState } from "react";
import RegistrationForm from "../components/features/registration/RegistrationForm";
import { useToast } from "../hooks/useToast";
import { format } from "date-fns";
import { useActivityDetail } from "../hooks/useActivityDetail";

export interface RegistrationFormHandle {
  submit: () => boolean;
}

const ActivityDetailPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const { activity, loading, error } = useActivityDetail(activityId || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<RegistrationFormHandle | null>(null);
  const { showToast } = useToast();

  const handleConfirmRegistration = () => {
    const isSuccess = formRef.current?.submit();
    if (isSuccess) {
      setIsModalOpen(false);
      showToast("報名成功！感謝您的參與。", "success");
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
                  {activity.leader}(領隊), {activity.guide}(嚮導)
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
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className={`font-semibold ${theme.textSecondary}`}>
                      A方案
                    </span>
                    <span className={`text-2xl font-bold ${theme.accent}`}>
                      NT$ {activity.priceA.toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-sm ${theme.textSecondary} text-right`}>
                    含嚮導、交通、餐食與保險
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className={`font-semibold ${theme.textSecondary}`}>
                      B方案
                    </span>
                    <span className={`text-xl font-bold ${theme.accent}`}>
                      NT$ {activity.priceB.toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-sm ${theme.textSecondary} text-right`}>
                    全程自理 (僅含嚮導與保險)
                  </p>
                </div>
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
        title={`報名活動：${activity.name}`}
      >
        <RegistrationForm ref={formRef} />
      </Dialog>
    </div>
  );
};
export default ActivityDetailPage;
