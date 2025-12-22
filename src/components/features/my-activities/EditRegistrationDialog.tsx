import React, { useState, useEffect, useMemo } from "react";
import Dialog from "../../common/Dialog";
import Button from "../../common/Button";
import { useUpdateRegistration } from "../../../hooks/useUpdateRegistration";
import type { MyRegistrationActivity } from "../../../types/my-activity.model";
import { useActivityDetail } from "../../../hooks/useActivityDetail";
import RadioGroupField from "../../common/RadioGroupField";
import FormField from "../../common/FormField";
import InputField from "../../common/InputField";
import Spinner from "../../common/Spinner";

interface EditRegistrationDialogProps {
  activity: MyRegistrationActivity;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback to refetch data on successful update
}

export const EditRegistrationDialog: React.FC<EditRegistrationDialogProps> = ({
  isOpen,
  onClose,
  activity,
  onSuccess,
}) => {
  const [plan, setPlan] = useState(activity.selectedPlan);
  const [hikingExperience, setHikingExperience] = useState(
    activity.hikingExperience || ""
  );

  // Fetch activity details to get available plans
  const {
    activity: detailedActivity,
    loading: activityLoading,
    error: activityError,
  } = useActivityDetail(String(activity.activityId));

  const { updateRegistration, loading: updateLoading } =
    useUpdateRegistration();

  // Reset form state when the dialog is opened or the activity changes
  useEffect(() => {
    if (isOpen) {
      setPlan(activity.selectedPlan);
      setHikingExperience(activity.hikingExperience || "");
    }
  }, [isOpen, activity.selectedPlan, activity.hikingExperience]);

  const handleConfirm = async () => {
    await updateRegistration({
      registrationId: activity.id,
      plan,
      hikingExperience,
    });
    onSuccess(); // Refetch the list
    onClose(); // Close the dialog
  };

  const planOptions = useMemo(() => {
    return (
      detailedActivity?.plans?.map((p) => ({
        label: `${p.name} ( NT$ ${p.price.toLocaleString()} ) - ${p.detail}`,
        value: p.name,
      })) || []
    );
  }, [detailedActivity]);

  const renderContent = () => {
    if (activityLoading) {
      return (
        <div className="flex justify-center items-center h-48">
          <Spinner />
        </div>
      );
    }

    if (activityError) {
      return (
        <div className="text-red-500 text-center py-4">
          無法載入活動方案，請稍後再試。
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* TODO: 需要從後端取得活動方案 */}
        <RadioGroupField
          label="方案選擇"
          name="plan"
          selectedValue={plan}
          onChange={(e) => setPlan(e.target.value)}
          options={planOptions}
        />
        <FormField label="登山經歷簡述 (最多500字)" htmlFor="hikingExperience">
          <InputField
            id="hikingExperience"
            name="hikingExperience"
            rows={4}
            value={hikingExperience}
            onChange={(e) => setHikingExperience(e.target.value)}
          />
        </FormField>
      </div>
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={`編輯報名：${activity.name}`}
      confirmText={updateLoading ? "更新中..." : "儲存"}
      isConfirming={updateLoading}
    >
      {renderContent()}
    </Dialog>
  );
};
