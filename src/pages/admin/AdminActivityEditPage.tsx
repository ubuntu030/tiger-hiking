// /src/pages/admin/AdminActivityEditPage.tsx
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import AdminActivityForm from "./AdminActivityForm";
import {
  GET_ACTIVITY_BY_ID,
  ADMIN_UPDATE_ACTIVITY,
} from "../../graphql/queries";
import { useToast } from "../../hooks/useToast";

const AdminActivityEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data, loading, error } = useQuery(GET_ACTIVITY_BY_ID, {
    variables: { id: parseInt(id || "0", 10) },
    skip: !id,
  });

  const [updateActivity, { loading: updateLoading }] = useMutation(
    ADMIN_UPDATE_ACTIVITY,
  );

  const handleSave = async (formData: any) => {
    try {
      await updateActivity({
        variables: { input: { id: parseInt(id || "0", 10), ...formData } },
      });
      showToast("活動更新成功", "success");
      navigate("/admin/activities");
    } catch (err) {
      console.error("Failed to update activity:", err);
      showToast("活動更新失敗", "error");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        讀取活動資料失敗: {error.message}
      </Typography>
    );
  }

  return (
    <AdminActivityForm
      initialData={data?.activity}
      onSave={handleSave}
      isLoading={updateLoading}
    />
  );
};

export default AdminActivityEditPage;
