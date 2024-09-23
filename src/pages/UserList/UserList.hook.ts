import { useNavigate } from "react-router";
import { useQueries } from "../../hooks/useQueries/useQueries.hook";
import { useSnackbar } from "../../context/SnackbarContext/SnackbarContext";
import { useEffect, useState } from "react";
import { User } from "./UserList.types";

const useUserList = () => {
    const navigate = useNavigate();
    const { users, deleteUser } = useQueries();
    const showSnackbar = useSnackbar();
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
    const handleOpenDialog = (user: User) => {
      setUserToDelete(user);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setUserToDelete(null);
    };

    const handleDeleteUser = (id: number) => {
      deleteUser.mutate(id, {
        onSuccess: () => {
          showSnackbar("Usuário deletado com sucesso.");
        },
      });
    };
  
    const confirmDelete = (id: number) => {
      handleDeleteUser(id);
      handleCloseDialog();
    };
    
    const handleSnackbarClose = () => {
      setOpenSnackbar(false);
    };
  
    useEffect(() => {
      if (users?.isError) {
        setSnackbarMessage("Erro ao carregar usuários.");
        setOpenSnackbar(true);
      }
    }, [users?.isError]);
  
  
    const handleEditUser = (user: User) => {
      navigate('/registrar-usuario', { state: { user } });
    };


    return {
        openSnackbar,
        snackbarMessage,
        handleSnackbarClose,
        handleEditUser,
        navigate,
        users,
        openDialog,
        userToDelete,
        handleOpenDialog,
        confirmDelete,
        handleCloseDialog,
    }
}

export default useUserList