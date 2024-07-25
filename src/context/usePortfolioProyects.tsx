import {PortfolioProyectContext} from '../modules/portfolio-proyect/PortfolioProyectContext'
import {useContext} from 'react'

export const usePortfolioProyects = () => {
    const context = useContext(PortfolioProyectContext);
    if (!context) {
        throw new Error('conetxt must be used within an AuthProvider');
    }
    return context;
};
