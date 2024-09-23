import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { User } from './RegisterUser.types';
import { useQueries } from '../../hooks/useQueries/useQueries.hook';
import { schema } from './RegisterUser.validation';
import { useSnackbar } from '../../context/SnackbarContext/SnackbarContext';
import { UserFormInputs } from './RegisterUser.validation';

const useRegisterUser = (userToEdit?: User) => {
    const { addUser, updateUser } = useQueries();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormInputs>({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    const handleSnackbarClose = () => {
      setOpenSnackbar(false);
    };
  
    const handleOnSubmit = (data: UserFormInputs) => { 
      onSubmit(data);
      const userName = data?.name;
      setSnackbarMessage(`Usuário ${userName} ${userToEdit ? 'atualizado' : 'adicionado'}!`);
      setOpenSnackbar(true);
    };

    const onSubmit = (data: UserFormInputs) => {
        const userData: User = { ...data, id: userToEdit ? userToEdit?.id : Date.now() };

        const onSuccessMessage = userToEdit 
            ? `Usuário ${data?.name} atualizado!` 
            : `Usuário ${data?.name} adicionado!`;

        if (userToEdit) {
            updateUser.mutate(userData, {
                onSuccess: () => {
                    showSnackbar(onSuccessMessage);
                    navigate('/');
                },
            });
        } else {
            addUser.mutate(userData, {
                onSuccess: () => {
                    showSnackbar(onSuccessMessage);
                    navigate('/');
                },
            });
        }
        reset();
    };

    useEffect(() => {
        if (userToEdit) {
            reset(userToEdit);
        }
    }, [reset, userToEdit]);

    return {
        register,
        handleSubmit,
        openSnackbar,
        snackbarMessage,
        handleSnackbarClose,
        handleOnSubmit,
        navigate,
        errors,
    };
};

export default useRegisterUser;
