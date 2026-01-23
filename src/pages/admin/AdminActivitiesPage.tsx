import React, { useState, useMemo } from "react";
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
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, FactCheck } from "@mui/icons-material";
import { useAdminActivities } from "../../hooks/useAdminActivities";
import useDebounce from "../../hooks/useDebounce";

const AdminActivitiesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string>("startDate");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { activities, totalCount, loading, removeActivity } =
    useAdminActivities(
      rowsPerPage,
      page * rowsPerPage,
      debouncedSearchQuery,
      orderBy,
      order.toUpperCase(),
    );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    setActivityToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (activityToDelete) {
      await removeActivity(activityToDelete);
      setDeleteDialogOpen(false);
      setActivityToDelete(null);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const staff = useMemo(() => {
    return (guides: { leader?: string; guide?: string; sweeper?: string }) => {
      const staffList = [guides.leader, guides.guide, guides.sweeper].filter(
        Boolean,
      );
      return staffList.join(", ");
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "報名登記":
        return "success.main";
      case "活動結束":
        return "text.disabled";
      case "不可報名":
        return "error.main";
      default:
        return "text.primary";
    }
  };

  const getRegistrationCountColor = (registered: number, max: number) => {
    if (registered > max) return "warning.main";
    if (registered === max) return "success.main";
    return "text.primary";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
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
        <Typography variant="h4">活動管理</Typography>
        <TextField
          label="搜尋活動"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ ml: 2, flexGrow: 1, maxWidth: 300 }}
        />
        <Button variant="contained">建立新活動</Button>
      </Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>名稱</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "startDate"}
                    direction={orderBy === "startDate" ? order : "asc"}
                    onClick={() => handleRequestSort("startDate")}
                  >
                    活動日期
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "registrationDeadline"}
                    direction={
                      orderBy === "registrationDeadline" ? order : "asc"
                    }
                    onClick={() => handleRequestSort("registrationDeadline")}
                  >
                    截止日期
                  </TableSortLabel>
                </TableCell>
                <TableCell>隨行人員</TableCell>
                <TableCell>報名人數</TableCell>
                <TableCell>待審核</TableCell>
                <TableCell>活動狀態</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    載入中...
                  </TableCell>
                </TableRow>
              ) : (
                activities?.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.name}</TableCell>
                    <TableCell>{formatDate(activity.startDate)}</TableCell>
                    <TableCell>
                      {formatDate(activity.registrationDeadline)}
                    </TableCell>
                    <TableCell>{staff(activity.guides)}</TableCell>
                    <TableCell
                      sx={{
                        color: getRegistrationCountColor(
                          activity.registeredCount,
                          activity.maxSlots,
                        ),
                      }}
                    >{`${activity.registeredCount}/${activity.maxSlots}`}</TableCell>
                    <TableCell>{activity.pendingCount}</TableCell>
                    <TableCell sx={{ color: getStatusColor(activity.status) }}>
                      {activity.status}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="審核">
                        <IconButton aria-label="review">
                          <FactCheck />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="編輯">
                        <IconButton aria-label="edit">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="刪除">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelete(String(activity.id))}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalCount || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>刪除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您確定要刪除此活動嗎？此操作無法復原。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminActivitiesPage;
