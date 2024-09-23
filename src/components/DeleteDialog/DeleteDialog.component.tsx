import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DeleteDialogProps } from "./DeleteDialog.types";
import useDeleteDialog from "./DeleteDialog.hook";

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, userToDelete, onClose, onConfirm }) => {
    const { handleDelete } = useDeleteDialog({userToDelete, onClose, onConfirm, open})

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Deleção</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você deseja deletar o usuário <strong>{userToDelete?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="error">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
