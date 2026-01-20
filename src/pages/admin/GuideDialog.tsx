import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Guide } from "../../types/guide.model";

interface GuideDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (guide: Partial<Guide>) => void;
  guide: Guide | null;
}

const GuideDialog = ({ open, onClose, onSave, guide }: GuideDialogProps) => {
  const [formData, setFormData] = useState<Partial<Guide>>({
    name: "",
    role: "",
    experience: "",
    image: "",
  });

  useEffect(() => {
    if (guide) {
      setFormData(guide);
    } else {
      setFormData({
        name: "",
        role: "",
        experience: "",
        image: "",
      });
    }
  }, [guide, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{guide ? "編輯嚮導" : "新增嚮導"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="姓名"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="角色"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="經歷"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="照片 URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
          />
          {formData.image && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={formData.image}
                alt="Image Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSave} variant="contained">
          儲存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuideDialog;
