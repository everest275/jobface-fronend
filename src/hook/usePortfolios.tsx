import {PortfolioContext} from '../context/PortfolioContext'
import {useContext} from 'react'

export const usePortfolios = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('conetxt must be used within an AuthProvider');
    }
    return context;
};
