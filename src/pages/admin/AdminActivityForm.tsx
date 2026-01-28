// /src/pages/admin/AdminActivityForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGuides } from "../../hooks/useGuides";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, addDays, subDays } from "date-fns";
import {
  useForm,
  Controller,
  useFieldArray,
  type FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema for validation
const planSchema = z.object({
  name: z.string().min(1, "方案名稱為必填欄位"),
  price: z.number().min(1, "價格需大於 0"),
  detail: z.string().min(1, "方案描述為必填欄位"),
});

const activitySchema = z
  .object({
    name: z.string().min(1, "活動名稱為必填欄位"),
    startDate: z.date({
      error: "請選擇開始日期",
    }),
    endDate: z.date({
      error: "請選擇結束日期",
    }),
    status: z.boolean(),
    description: z.string().min(1, "活動描述為必填欄位"),
    registrationDeadline: z.date({
      error: "請選擇報名截止日期",
    }),
    image: z.string().optional(),
    maxSlots: z.number().min(1, "最大報名人數至少為 1"),
    guides: z.array(z.string()).min(1, "請至少選擇一位嚮導"),
    leader: z.array(z.string()).min(1, "請至少選擇一位領隊"),
    sweeper: z.array(z.string()).min(1, "請至少選擇一位押隊"),
    plans: z.array(planSchema).min(1, "請至少新增一個方案"),
    transport: z.string().min(1, "交通與接駁資訊為必填欄位"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "結束日期必須大於等於開始日期",
    path: ["endDate"],
  })
  .refine((data) => data.startDate > data.registrationDeadline, {
    message: "活動開始日期必須晚於報名截止日期",
    path: ["startDate"],
  });

type ActivityFormData = z.infer<typeof activitySchema>;

// 表單的 Props 型別定義
interface AdminActivityFormProps {
  initialData?: Partial<ActivityFormData> & {
    guides?: string[];
    leader?: string[];
    sweeper?: string[];
    plans?: { name: string; price: number; detail: string }[];
    startDate?: string;
    endDate?: string;
    registrationDeadline?: string;
  };
  onSave: (data: any) => Promise<void>;
  isLoading: boolean;
}

const AdminActivityForm: React.FC<AdminActivityFormProps> = ({
  initialData,
  onSave,
  isLoading,
}) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { guides: allGuides } = useGuides();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: initialData?.name || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate)
        : addDays(new Date(), 7),
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      status: initialData?.status ?? true,
      description: initialData?.description || "",
      registrationDeadline: initialData?.registrationDeadline
        ? new Date(initialData.registrationDeadline)
        : undefined,
      image: initialData?.image || "",
      maxSlots: initialData?.maxSlots || 1,
      guides: initialData?.guides || [],
      leader: initialData?.leader || [],
      sweeper: initialData?.sweeper || [],
      plans: initialData?.plans || [{ name: "", price: 1, detail: "" }],
      transport: initialData?.transport || "",
    },
  });

  // 錯誤處理函式
  const onError = (errors: FieldErrors<ActivityFormData>) => {
    console.group("❌ 表單驗證失敗");
    console.log("錯誤物件 (Errors Object):", errors);

    // 如果想要更詳細地列出每個欄位的錯誤訊息：
    Object.entries(errors).forEach(([key, error]) => {
      // 處理 nested errors (例如 plans 陣列)
      if (key === "plans" && Array.isArray(error)) {
        console.error(`欄位: ${key}`);
        error.forEach((planErr: any, index: number) => {
          if (planErr)
            console.error(`  - 第 ${index + 1} 個方案錯誤:`, planErr);
        });
      } else {
        // 一般欄位
        console.error(`欄位: ${key}, 訊息: ${(error as any)?.message}`);
      }
    });
    console.groupEnd();
  };

  const {
    fields: plans,
    append: appendPlan,
    remove: removePlan,
  } = useFieldArray({
    control,
    name: "plans",
  });

  const watchStartDate = watch("startDate");
  const watchimage = watch("image");

  const handleConfirmSave = async (data: ActivityFormData) => {
    const activityData = {
      ...data,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      registrationDeadline: format(data.registrationDeadline, "yyyy-MM-dd"),
    };
    await onSave(activityData);
    setConfirmOpen(false);
  };

  const onFormSubmit = (data: ActivityFormData) => {
    setConfirmOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {initialData?.name ? "編輯活動" : "新增活動"}
          </Typography>

          <form onSubmit={handleSubmit(onFormSubmit, onError)} noValidate>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="活動名稱"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 1 }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ?? null}
                    label="開始日期"
                    format="yyyy-MM-dd"
                    minDate={new Date()}
                    maxDate={watch("endDate") || undefined}
                    sx={{ flex: 1 }}
                    slotProps={{
                      textField: {
                        required: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate?.message,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ?? null}
                    label="結束日期"
                    format="yyyy-MM-dd"
                    minDate={watchStartDate || new Date()}
                    sx={{ flex: 1 }}
                    slotProps={{
                      textField: {
                        required: true,
                        error: !!errors.endDate,
                        helperText: errors.endDate?.message,
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Controller
              name="registrationDeadline"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value ?? null}
                  label="報名截止日期"
                  format="yyyy-MM-dd"
                  minDate={new Date()}
                  maxDate={watchStartDate ? subDays(watchStartDate, 1) : undefined}
                  sx={{ width: "100%", mt: 2, mb: 1 }}
                  slotProps={{
                    textField: {
                      required: true,
                      error: !!errors.registrationDeadline,
                      helperText: errors.registrationDeadline?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="maxSlots"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="最大報名人數"
                  type="number"
                  fullWidth
                  margin="normal"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: 1 }}
                  required
                  error={!!errors.maxSlots}
                  helperText={errors.maxSlots?.message}
                />
              )}
            />
            <FormControlLabel
              control={
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Switch {...field} checked={field.value} />
                  )}
                />
              }
              label="活動狀態 (開啟/關閉)"
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="活動描述"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="活動圖片 URL"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.image}
                  helperText={errors.image?.message}
                />
              )}
            />
            {watchimage && (
              <Accordion defaultExpanded sx={{ mt: 1, mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>圖片預覽</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    component="img"
                    src={watchimage}
                    alt="活動圖片預覽"
                    sx={{
                      width: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            )}

            <Typography variant="h6" sx={{ mt: 3 }}>
              隨行人員
            </Typography>
            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!errors.guides}
            >
              <InputLabel id="guides-label">嚮導</InputLabel>
              <Controller
                name="guides"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="guides-label"
                    multiple
                    input={<OutlinedInput label="嚮導" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                          const guide = allGuides.find(
                            (g) => String(g.id) === value,
                          );
                          return (
                            <Chip key={value} label={guide?.name || value} />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {allGuides.map((guide) => (
                      <MenuItem key={guide.id} value={String(guide.id)}>
                        {guide.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.guides && (
                <Typography color="error" variant="caption">
                  {errors.guides.message}
                </Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!errors.leader}
            >
              <InputLabel id="leader-label">領隊</InputLabel>
              <Controller
                name="leader"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="leader-label"
                    multiple
                    input={<OutlinedInput label="領隊" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                          const guide = allGuides.find(
                            (g) => String(g.id) === value,
                          );
                          return (
                            <Chip key={value} label={guide?.name || value} />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {allGuides.map((guide) => (
                      <MenuItem key={guide.id} value={String(guide.id)}>
                        {guide.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.leader && (
                <Typography color="error" variant="caption">
                  {errors.leader.message}
                </Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              required
              error={!!errors.sweeper}
            >
              <InputLabel id="sweeper-label">押隊</InputLabel>
              <Controller
                name="sweeper"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="sweeper-label"
                    multiple
                    input={<OutlinedInput label="押隊" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                          const guide = allGuides.find(
                            (g) => String(g.id) === value,
                          );
                          return (
                            <Chip key={value} label={guide?.name || value} />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {allGuides.map((guide) => (
                      <MenuItem key={guide.id} value={String(guide.id)}>
                        {guide.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.sweeper && (
                <Typography color="error" variant="caption">
                  {errors.sweeper.message}
                </Typography>
              )}
            </FormControl>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">方案</Typography>
              {errors.plans && (
                <Typography color="error" variant="caption">
                  {errors.plans.message}
                </Typography>
              )}
              {plans.map((plan, index) => (
                <Paper key={plan.id} sx={{ p: 5, mt: 2, position: "relative" }}>
                  <Controller
                    name={`plans.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="方案名稱"
                        fullWidth
                        margin="dense"
                        required
                        error={!!errors.plans?.[index]?.name}
                        helperText={errors.plans?.[index]?.name?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`plans.${index}.price`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="方案價格"
                        type="number"
                        fullWidth
                        margin="dense"
                        required
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        inputProps={{ min: 1 }}
                        error={!!errors.plans?.[index]?.price}
                        helperText={errors.plans?.[index]?.price?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`plans.${index}.detail`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="方案描述"
                        multiline
                        rows={2}
                        fullWidth
                        margin="dense"
                        required
                        error={!!errors.plans?.[index]?.detail}
                        helperText={errors.plans?.[index]?.detail?.message}
                      />
                    )}
                  />
                  {plans.length > 1 && (
                    <IconButton
                      onClick={() => removePlan(index)}
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Paper>
              ))}
              <Button
                startIcon={<Add />}
                onClick={() =>
                  appendPlan({ name: "", price: 1, detail: "" })
                }
                sx={{ mt: 2 }}
              >
                新增方案
              </Button>
            </Box>

            <Controller
              name="transport"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="交通與接駁資訊"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  sx={{ mt: 4 }}
                  required
                  error={!!errors.transport}
                  helperText={errors.transport?.message}
                />
              )}
            />

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={() => navigate(-1)}>
                取消
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? "儲存中..." : "儲存"}
              </Button>
            </Box>
          </form>
        </Paper>

        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>確認儲存</DialogTitle>
          <DialogContent>
            <DialogContentText>您確定要儲存這次的變更嗎？</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>取消</Button>
            <Button onClick={handleSubmit(handleConfirmSave)} color="primary">
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default AdminActivityForm;
