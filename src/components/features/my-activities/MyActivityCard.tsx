import React, { useState } from "react";
import { Link } from "react-router-dom";
import type {
  MyRegistrationActivity,
  PaymentStatus,
} from "../../../types/my-activity.model";
import { EditRegistrationDialog } from "./EditRegistrationDialog";
import theme from "../../../constants/theme";
import Button from "../../common/Button";
import { useCancelRegistration } from "../../../hooks/useCancelRegistration";
import Dialog from "../../common/Dialog";
import {
  CalendarDays,
  CircleDollarSign,
  Clock,
  CreditCard,
  Hash,
  ListChecks,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock3,
  CircleOff,
  Ticket,
  ExternalLink,
} from "lucide-react";
import type { RegistrationStatus } from "../../../types/registration.model";

interface MyActivityCardProps {
  registrationActivity: MyRegistrationActivity;
  onUpdateSuccess: () => void;
}

const renderStatusChip = (
  status: RegistrationStatus | PaymentStatus | string
) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-800";
  let Icon = Clock3;

  switch (status) {
    case "APPROVED":
    case "PAID":
    case "NO_PAYMENT":
    case "LOTTERY_WON":
    case "LOTTERY_NO_LOTTERY":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      Icon = CheckCircle2;
      break;
    case "PENDING":
    case "UNPAID":
    case "LOTTERY_PENDING":
    case "LOTTERY_WAITING":
      bgColor = "bg-orange-100";
      textColor = "text-orange-800";
      Icon = Clock3;
      break;
    case "REJECTED":
    case "USER_CANCELLED":
    case "LOTTERY_LOST":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      Icon = XCircle;
      break;
    case "CANCELLED":
    case "REFUNDED":
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
      Icon = CircleOff;
      break;
  }

  // 處理從 GraphQL Enum 直接傳來的 'PENDING', 'APPROVED' 等字串
  const statusTextMap: Record<string, string> = {
    PENDING: "審核中",
    APPROVED: "已核准",
    REJECTED: "未核准",
    CANCELLED: "已取消",
    USER_CANCELLED: "使用者自行取消",

    PAID: "已收到款項",
    UNPAID: "未繳費",
    REFUNDED: "已退款",
    NO_PAYMENT: "無須繳費",

    LOTTERY_WON: "已抽中",
    LOTTERY_LOST: "未抽中",
    LOTTERY_PENDING: "尚未抽籤",
    LOTTERY_WAITING: "候補中",
    LOTTERY_NO_LOTTERY: "無須抽籤",
  };

  const displayText = statusTextMap[status] || status;

  return (
    <span
      className={`inline-flex items-center gap-x-1.5 rounded-full ${bgColor} px-2 py-1 text-xs font-medium ${textColor}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {displayText}
    </span>
  );
};

const InfoItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}> = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col">
    <div
      className={`flex items-center text-sm font-medium ${theme.textSecondary}`}
    >
      <Icon className="h-4 w-4 mr-2" />
      <span>{label}</span>
    </div>
    <div className={`mt-1 text-base ${theme.textPrimary}`}>{value}</div>
  </div>
);

export const MyActivityCard: React.FC<MyActivityCardProps> = ({
  registrationActivity,
  onUpdateSuccess,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const { cancelRegistration, loading: isCanceling } = useCancelRegistration();

  const handleEdit = () => setIsEditDialogOpen(true);
  const handleCloseDialog = () => setIsEditDialogOpen(false);

  const handleCancelRegistration = () => {
    // Note: useCancelRegistration seems to expect activity ID, but it should be registration ID
    cancelRegistration(registrationActivity.id);
    setIsCancelDialogOpen(false);
    onUpdateSuccess();
  };

  const {
    activity,
    plan,
    createdAt,
    registrationStatus,
    paymentStatus,
    amountDue,
    bunkLotteryStatus,
  } = registrationActivity;

  const isActionsDisabled = ["REJECTED", "CANCELLED", "USER_CANCELLED"].includes(
    registrationStatus as string
  );

  return (
    <>
      <div
        className={`${theme.cardBg} rounded-xl p-6 mb-6 shadow-md border ${theme.border} transition-all hover:shadow-lg`}
      >
        {/* Card Header */}
        <div
          className={`flex justify-between items-center pb-4 border-b ${theme.border}`}
        >
          <h3
            className="text-2xl font-bold tracking-tight"
          >
            <Link
              to={`/activities/${activity.id}`}
              className={`group flex items-center gap-2 ${theme.textPrimary} hover:${theme.accent}`}
            >
              <span className="group-hover:underline decoration-2 underline-offset-4">
                {activity.name}
              </span>
              <ExternalLink className={`h-5 w-5 ${theme.textSecondary} group-hover:text-current transition-colors`} />
            </Link>
          </h3>
          <div className="flex space-x-2">
            <Button
              onClick={handleEdit}
              variant="ghost"
              disabled={isActionsDisabled}
              className={isActionsDisabled ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Pencil
                color={isActionsDisabled ? "gray" : "green"}
                className="h-5 w-5"
              />
            </Button>
            <Button
              onClick={() => setIsCancelDialogOpen(true)}
              variant="danger-ghost"
              disabled={isActionsDisabled}
              className={isActionsDisabled ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <InfoItem
            icon={CalendarDays}
            label="活動日期"
            value={`${new Date(
              activity.startDate
            ).toLocaleDateString()} - ${new Date(
              activity.endDate
            ).toLocaleDateString()}`}
          />
          <InfoItem icon={ListChecks} label="選擇方案" value={plan} />
          <InfoItem
            icon={CircleDollarSign}
            label="應繳金額"
            value={`$${amountDue.toLocaleString()}`}
          />
          <InfoItem
            icon={Hash}
            label="報名狀態"
            value={renderStatusChip(registrationStatus)}
          />
          <InfoItem
            icon={Ticket}
            label="山屋抽籤狀態"
            value={renderStatusChip(bunkLotteryStatus)}
          />
          <InfoItem
            icon={CreditCard}
            label="繳費狀態"
            value={renderStatusChip(paymentStatus)}
          />
          <InfoItem
            icon={Clock}
            label="報名時間"
            value={new Date(createdAt).toLocaleString()}
          />
        </div>
      </div>

      <EditRegistrationDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
        activity={registrationActivity}
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
