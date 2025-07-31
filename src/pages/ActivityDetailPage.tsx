import { useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import PageTitle from '../components/layout/PageTitle';
import { mockData } from '../constants/mockData';
import theme from '../constants/theme';
import RegistrationForm from '../components/common/RegistrationForm';
import Dialog from '../components/common/Dialog';
import { useRef, useState } from 'react';

export interface RegistrationFormHandle {
  submit: () => boolean;
}

const ActivityDetailPage = () => {
  const { activityId } = useParams();
  const activity = mockData.activities.find(
    (act) => act.id === parseInt(activityId || '')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<RegistrationFormHandle | null>(null);

  const handleConfirmRegistration = () => {
    if (formRef.current?.submit()) {
      setIsModalOpen(false);
    }
  };

  if (!activity) {
    return (
      <div className="text-center">
        <PageTitle
          title="404 - 找不到活動"
          subtitle="您要找的活動可能已經不存在或被移動了。"
        />
        <Button to="/" onClick={() => {}}>
          回到首頁
        </Button>
      </div>
    );
  }

  const isRegistrationOpen = activity.status === '報名登記';

  return (
    <div>
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-2">{activity.name}</h1>
          <p className={`text-lg ${theme.textSecondary} mb-6`}>
            {activity.startDate} - {activity.endDate}
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
                  {activity.guides.leader}(領隊), {activity.guides.guide}(嚮導)
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
                {isRegistrationOpen ? '立即報名申請' : '報名截止'}
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
