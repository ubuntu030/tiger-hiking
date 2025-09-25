import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MyActivity } from '../../../types/my-activity.model';
import { EditRegistrationDialog } from './EditRegistrationDialog';
import theme from '../../../constants/theme';
import Button from '../../common/Button';
import { useCancelRegistration } from '../../../hooks/useCancelRegistration';
import Dialog from '../../common/Dialog';

interface MyActivityCardProps {
  activity: MyActivity;
  onUpdateSuccess: () => void;
}

export const MyActivityCard: React.FC<MyActivityCardProps> = ({ activity, onUpdateSuccess }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const { cancelRegistration, loading: isCanceling } = useCancelRegistration();

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCancelRegistration = () => {
    cancelRegistration(activity.id);
    setIsCancelDialogOpen(false);
    onUpdateSuccess();
  };

  const renderStatusChip = (status: string) => {
    const isApproved = status === '已核准';
    const isPaid = status === '已收到款項';
    const bgColor = isApproved || isPaid ? 'bg-green-100' : 'bg-yellow-100';
    const textColor = isApproved || isPaid ? 'text-green-800' : 'text-yellow-800';
    return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bgColor} ${textColor}`}>{status}</span>;
  };

  return (
    <>
      <div className={`${theme.cardBg} rounded-lg p-6 mb-6 shadow-sm border ${theme.border}`}>
        <div className="flex justify-between items-start">
            <h3 className={`text-xl font-semibold ${theme.textPrimary} hover:${theme.accent}`}>
              <Link to={`/activities/${activity.activityId}`}>{activity.name}</Link>
            </h3>
            <div className="flex space-x-2">
              <Button onClick={handleEdit}>編輯</Button>
              <Button onClick={() => setIsCancelDialogOpen(true)} variant="danger">取消報名</Button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mt-4 text-sm">
          <div>
            <p className={`${theme.textSecondary} font-medium`}>活動日期</p>
            <p className={`${theme.textPrimary}`}>{new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className={`${theme.textSecondary} font-medium`}>選擇方案</p>
            <p className={`${theme.textPrimary}`}>{activity.selectedPlan}</p>
          </div>
          <div>
            <p className={`${theme.textSecondary} font-medium`}>應繳金額</p>
            <p className={`${theme.textPrimary}`}>${activity.amountDue.toLocaleString()}</p>
          </div>
          <div>
            <p className={`${theme.textSecondary} font-medium`}>報名狀態</p>
            {renderStatusChip(activity.registrationStatus)}
          </div>
          <div>
            <p className={`${theme.textSecondary} font-medium`}>繳費狀態</p>
            {renderStatusChip(activity.paymentStatus)}
          </div>
          <div>
            <p className={`${theme.textSecondary} font-medium`}>報名時間</p>
            <p className={`${theme.textPrimary}`}>{new Date(activity.registrationTime).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <EditRegistrationDialog 
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
        activity={activity}
        onSuccess={() => {
          onUpdateSuccess();
          handleCloseDialog();
        }}
      />

      <Dialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={handleCancelRegistration}
        title="確認取消報名"
        confirmText="確認取消"
        isConfirming={isCanceling}
      >
        <p>您確定要取消報名此活動嗎？此操作無法復原。</p>
      </Dialog>
    </>
  );
};
