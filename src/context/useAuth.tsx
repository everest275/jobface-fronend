import {AuthContext} from '../modules/auth/AuthContext'
import {useContext} from 'react'

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('conetxt must be used within an AuthProvider');
    }
    return context;
};
