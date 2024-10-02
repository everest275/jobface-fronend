import {AuthContext} from '../context/AuthfaceContext'
import {useContext} from 'react'

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('conetxt must be used within an AuthProvider');
    }
    return context;
};
