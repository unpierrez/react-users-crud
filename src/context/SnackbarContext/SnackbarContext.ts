import { createContext, useContext } from 'react';
import { SnackbarContextType } from './SnackbarContext.types';

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    return context!.showSnackbar;
};

export default SnackbarContext;