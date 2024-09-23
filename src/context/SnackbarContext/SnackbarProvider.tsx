import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import SnackbarContext from './SnackbarContext';
import { SnackbarSeverity, SnackbarProviderProps } from './SnackbarContext.types';

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<SnackbarSeverity>('success');

    const showSnackbar = (msg: string, sev: SnackbarSeverity = 'success') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};