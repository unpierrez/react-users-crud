import { DeleteDialogProps } from "./DeleteDialog.types";

const useDeleteDialog = ({ userToDelete, onClose, onConfirm }: DeleteDialogProps) => {
    const handleDelete = () => {
        if (userToDelete) {
            onConfirm(userToDelete.id);
            onClose();
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteDialog;
