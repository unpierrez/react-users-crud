import { ReactNode } from "react";

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarContextType {
    showSnackbar: (msg: string, sev?: SnackbarSeverity) => void;
}

export interface SnackbarProviderProps {
    children: ReactNode;
}