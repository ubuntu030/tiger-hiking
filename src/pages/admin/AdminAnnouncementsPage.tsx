import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  useAdminAnnouncements,
  type Announcement,
} from "../../hooks/useAdminAnnouncements";
import { useToast } from "../../hooks/useToast";

const AdminAnnouncementsPage = () => {
  const { showToast } = useToast();
  // Search and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Custom hook for fetching and managing announcement data
  const {
    announcements,
    totalCount,
    loading,
    removeAnnouncement,
    updateAnnouncement,
    createAnnouncement,
    refetch,
  } = useAdminAnnouncements(limit, (page - 1) * limit, searchQuery);

  // Dialog open/close state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Current selected or editing announcement data
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [editedAnnouncement, setEditedAnnouncement] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  // Calculate total pages
  const pageCount = totalCount ? Math.ceil(totalCount / limit) : 0;

  // Handle page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  // Handle delete button click, opens confirmation dialog
  const handleDeleteClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDeleteDialogOpen(true);
  };

  // Confirm delete operation
  const handleDeleteConfirm = async () => {
    if (selectedAnnouncement) {
      try {
        await removeAnnouncement(selectedAnnouncement.id);
        refetch();
        setDeleteDialogOpen(false);
        setSelectedAnnouncement(null);
        showToast("刪除成功", "success");
      } catch (err: any) {
        showToast(err.message || "刪除失敗", "error");
      }
    }
  };

  // Handle edit button click, opens edit dialog
  const handleEditClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setEditedAnnouncement({
      title: announcement.title,
      content: announcement.content,
    });
    setEditDialogOpen(true);
  };

  // Save edited announcement
  const handleEditSave = async () => {
    if (selectedAnnouncement) {
      try {
        await updateAnnouncement({
          id: selectedAnnouncement.id,
          ...editedAnnouncement,
        });
        refetch();
        setEditDialogOpen(false);
        setSelectedAnnouncement(null);
        showToast("更新成功", "success");
      } catch (err: any) {
        showToast(err.message || "更新失敗", "error");
      }
    }
  };

  // Handle create button click, opens create dialog
  const handleCreateClick = () => {
    setEditedAnnouncement({ title: "", content: "" });
    setCreateDialogOpen(true);
  };

  // Save new announcement
  const handleCreateSave = async () => {
    try {
      await createAnnouncement(editedAnnouncement);
      refetch();
      setCreateDialogOpen(false);
      showToast("建立成功", "success");
    } catch (err: any) {
      showToast(err.message || "建立失敗", "error");
    }
  };

  // Handle input changes in forms
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAnnouncement((prev) => ({ ...prev, [name]: value }));
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
        <Typography variant="h4">公告管理</Typography>
        <TextField
          label="搜尋公告"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ ml: 2, flexGrow: 1, maxWidth: 300 }}
        />
        <Button variant="contained" onClick={handleCreateClick}>
          建立新公告
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>標題</TableCell>
              <TableCell>內容</TableCell>
              <TableCell>更新時間</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              announcements?.map((ann) => (
                <TableRow key={ann.id}>
                  <TableCell>{ann.title}</TableCell>
                  <TableCell>{ann.content}</TableCell>
                  <TableCell>
                    {new Date(ann.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(ann)}
                      >
                        編輯
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(ann)}
                      >
                        刪除
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>刪除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您確定要刪除此公告嗎？此操作無法復原。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            刪除
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>編輯公告</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="標題"
            type="text"
            fullWidth
            variant="standard"
            value={editedAnnouncement.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="內容"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={editedAnnouncement.content}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>取消</Button>
          <Button onClick={handleEditSave}>儲存</Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      >
        <DialogTitle>建立新公告</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="標題"
            type="text"
            fullWidth
            variant="standard"
            value={editedAnnouncement.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="內容"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={editedAnnouncement.content}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>取消</Button>
          <Button onClick={handleCreateSave}>建立</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminAnnouncementsPage;
