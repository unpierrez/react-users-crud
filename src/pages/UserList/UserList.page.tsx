import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Snackbar, Alert } from '@mui/material';
import useUserList from './UserList.hook';
import { User } from './UserList.types'; 
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog.component';

const UserList = () => {
  const {
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
  } = useUserList();

  return (
    <Box sx={{ pt: { xs: 5, sm: 5, xl: 10 }, pb: 2, px: { xs: 2, sm: 5 } }}>
      <Button onClick={() => navigate('/registrar-usuario')} size="large" variant="contained">
        Novo usuário
      </Button>
      <Card sx={{ mt: 2, p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                users?.data?.map((user: User) => (
                  <TableRow key={user?.id}>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.cpf}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.phone}</TableCell>
                    <TableCell>{user?.address}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditUser(user)}>Editar</Button>
                      <Button onClick={() => handleOpenDialog(user)} color="error">
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={users?.isError? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <DeleteDialog 
        open={openDialog} 
        userToDelete={userToDelete} 
        onClose={handleCloseDialog} 
        onConfirm={confirmDelete} 
      />
    </Box>
  );
};

export default UserList;
