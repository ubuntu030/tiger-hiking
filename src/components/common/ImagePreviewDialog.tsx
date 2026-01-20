import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImagePreviewDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

const ImagePreviewDialog = ({
  open,
  onClose,
  imageUrl,
}: ImagePreviewDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
