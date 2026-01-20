import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete, ZoomIn } from "@mui/icons-material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useGuides } from "../../hooks/useGuides";
import { useToast } from "../../hooks/useToast";
import type { Guide } from "../../types/guide.model";
import {
  CREATE_GUIDE,
  UPDATE_GUIDE,
  DELETE_GUIDE,
} from "../../graphql/queries";
import GuideDialog from "./GuideDialog";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import ImagePreviewDialog from "../../components/common/ImagePreviewDialog";

const AdminGuidesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { guides, loading, error, refetch } = useGuides(searchQuery);
  const { showToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [guideToDelete, setGuideToDelete] = useState<number | null>(null);

  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const [createGuide] = useMutation(CREATE_GUIDE);
  const [updateGuide] = useMutation(UPDATE_GUIDE);
  const [deleteGuide] = useMutation(DELETE_GUIDE);

  const handleAdd = () => {
    setSelectedGuide(null);
    setDialogOpen(true);
  };

  const handleEdit = (guide: Guide) => {
    setSelectedGuide(guide);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setGuideToDelete(id);
    setConfirmOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedGuide(null);
  };

  const handleConfirmDelete = async () => {
    if (guideToDelete) {
      try {
        await deleteGuide({ variables: { id: guideToDelete } });
        showToast("嚮導已刪除", "success");
        refetch();
      } catch (e) {
        const err = e as Error;
        showToast(`刪除失敗: ${err.message}`, "error");
      } finally {
        setConfirmOpen(false);
        setGuideToDelete(null);
      }
    }
  };

  const handleSave = async (guideData: Partial<Guide>) => {
    try {
      if (selectedGuide) {
        await updateGuide({
          variables: {
            input: {
              id: selectedGuide.id,
              name: guideData.name,
              role: guideData.role,
              experience: guideData.experience,
              image: guideData.image,
            },
          },
        });
        showToast("嚮導已更新", "success");
      } else {
        await createGuide({
          variables: {
            input: {
              name: guideData.name,
              role: guideData.role,
              experience: guideData.experience,
              image: guideData.image,
            },
          },
        });
        showToast("嚮導已新增", "success");
      }
      refetch();
      handleCloseDialog();
    } catch (e) {
      const err = e as Error;
      showToast(`儲存失敗: ${err.message}`, "error");
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setImagePreviewOpen(true);
  };

  const handleCloseImagePreview = () => {
    setImagePreviewOpen(false);
    setCurrentImageUrl(null);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 4,
        }}
      >
        <Typography variant="h4">嚮導管理</Typography>
        <TextField
          label="搜尋人物"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ ml: 2, flexGrow: 1, maxWidth: 300 }}
        />
        <Button variant="contained" onClick={handleAdd}>
          新增嚮導
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">讀取嚮導失敗: {error.message}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>照片</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>角色</TableCell>
                <TableCell>經歷</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guides.map((guide) => (
                <TableRow key={guide.id}>
                  <TableCell>
                    <Box
                      sx={{
                        position: "relative",
                        width: 50,
                        height: 50,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover .zoom-icon": {
                          opacity: 1,
                        },
                      }}
                    >
                      <img
                        src={guide.image}
                        alt={guide.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        className="zoom-icon"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,0.4)",
                          color: "white",
                          opacity: 0,
                          transition: "opacity 0.3s",
                          borderRadius: 0,
                        }}
                        onClick={() => handleImageClick(guide.image)}
                      >
                        <ZoomIn />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{guide.name}</TableCell>
                  <TableCell>{guide.role}</TableCell>
                  <TableCell>{guide.experience}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(guide)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(guide.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <GuideDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        guide={selectedGuide}
      />

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="確認刪除"
        message="確定要刪除這位嚮導嗎？此操作無法復原。"
      />

      <ImagePreviewDialog
        open={imagePreviewOpen}
        onClose={handleCloseImagePreview}
        imageUrl={currentImageUrl}
      />
    </Container>
  );
};
export default AdminGuidesPage;
