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
import { useAdminFaqs } from "../../hooks/useAdminFaqs";
import { type Faq } from "../../hooks/useFAQs";

const AdminFaqsPage = () => {
  // 搜尋關鍵字與分頁狀態
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // 使用自定義 Hook 獲取 FAQ 資料與操作方法
  const { faqs, totalCount, loading, deleteFaq, updateFaq, createFaq } =
    useAdminFaqs(limit, (page - 1) * limit, searchQuery);

  // 對話框顯示狀態控制
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // 當前選中或編輯中的 FAQ 資料
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [editedFaq, setEditedFaq] = useState<{ q: string; a: string }>({
    q: "",
    a: "",
  });

  // 計算總頁數
  const pageCount = totalCount ? Math.ceil(totalCount / limit) : 0;

  // 處理頁碼變更
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // 點擊刪除按鈕，開啟確認對話框
  const handleDeleteClick = (faq: Faq) => {
    setSelectedFaq(faq);
    setDeleteDialogOpen(true);
  };

  // 確認刪除操作
  const handleDeleteConfirm = async () => {
    if (selectedFaq) {
      await deleteFaq(selectedFaq.id);
      setDeleteDialogOpen(false);
      setSelectedFaq(null);
    }
  };

  // 點擊編輯按鈕，開啟編輯對話框並填入資料
  const handleEditClick = (faq: Faq) => {
    setSelectedFaq(faq);
    setEditedFaq({ q: faq.q, a: faq.a });
    setEditDialogOpen(true);
  };

  // 儲存編輯後的 FAQ
  const handleEditSave = async () => {
    if (selectedFaq) {
      await updateFaq({ id: selectedFaq.id, ...editedFaq });
      setEditDialogOpen(false);
      setSelectedFaq(null);
    }
  };

  // 點擊新增按鈕，開啟新增對話框
  const handleCreateClick = () => {
    setEditedFaq({ q: "", a: "" });
    setCreateDialogOpen(true);
  };

  // 儲存新建立的 FAQ
  const handleCreateSave = async () => {
    await createFaq(editedFaq);
    setCreateDialogOpen(false);
  };

  // 處理輸入框變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedFaq((prev) => ({ ...prev, [name]: value }));
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
        <Typography variant="h4">問答管理</Typography>
        <TextField
          label="Search FAQs"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            console.log(e.target.value);
        }}
          sx={{ ml: 2, flexGrow: 1, maxWidth: 300 }}
        />
        <Button variant="contained" onClick={handleCreateClick}>
          建立新問答
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>問題</TableCell>
              <TableCell>答案</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : (
              faqs?.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>{faq.q}</TableCell>
                  <TableCell>{faq.a}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(faq)}
                      >
                        編輯
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(faq)}
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

      {/* 刪除確認對話框 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>刪除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您確定要刪除此問答嗎？此操作無法復原。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* 編輯對話框 */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>編輯問答</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="q"
            label="問題"
            type="text"
            fullWidth
            variant="standard"
            value={editedFaq.q}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="a"
            label="答案"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={editedFaq.a}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* 新增對話框 */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      >
        <DialogTitle>建立新問答</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="q"
            label="問題"
            type="text"
            fullWidth
            variant="standard"
            value={editedFaq.q}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="a"
            label="答案"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            value={editedFaq.a}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateSave}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminFaqsPage;
