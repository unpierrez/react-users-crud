import { TextField, Button, Card, Box, Snackbar, Alert } from '@mui/material';
import useRegisterUser from './RegisterUser.hook';
import { useLocation } from 'react-router-dom';

const RegisterUser = () => {
  const location = useLocation();
  const userToEdit = location.state?.user;

  const {
    register,
    handleSubmit,
    openSnackbar,
    snackbarMessage,
    handleSnackbarClose,
    handleOnSubmit,
    navigate,
  } = useRegisterUser(userToEdit);

  return (
    <Box sx={{ pt: { xs: 5, sm: 5, xl: 10 }, px: { xs: 2, sm: 5 } }}>
      <Button onClick={() => navigate('/')} size="large" variant="outlined">
        Voltar
      </Button>
      <Card sx={{ mt: 2, p: 3 }}>
        <h1>{userToEdit ? 'Editar ' : 'Cadastrar '}usuário</h1>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField {...register('name')} label="Nome" fullWidth margin="normal" />
          <TextField {...register('email')} label="Email" fullWidth margin="normal" />
          <TextField {...register('cpf')} label="CPF" fullWidth margin="normal" />
          <TextField {...register('phone')} label="Telefone" fullWidth margin="normal" />
          <TextField {...register('address')} label="Endereço (Opcional)" fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Salvar</Button>
        </form>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterUser;
