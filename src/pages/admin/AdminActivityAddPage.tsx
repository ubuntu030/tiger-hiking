// /src/pages/admin/AdminActivityAddPage.tsx
import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AdminActivityForm from "./AdminActivityForm";
import { ADMIN_CREATE_ACTIVITY } from "../../graphql/queries";
import { useToast } from "../../hooks/useToast";

const AdminActivityAddPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [createActivity, { loading }] = useMutation(ADMIN_CREATE_ACTIVITY);

  const handleSave = async (data: any) => {
    try {
      await createActivity({ variables: { input: data } });
      showToast("活動新增成功", "success");
      navigate("/admin/activities");
    } catch (error) {
      console.error("Failed to create activity:", error);
      showToast("活動新增失敗", "error");
    }
  };

  return <AdminActivityForm onSave={handleSave} isLoading={loading} />;
};

export default AdminActivityAddPage;
