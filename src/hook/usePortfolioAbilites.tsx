import {PortfolioAbilitieContext} from '../context/AbilitieContext'
import {useContext} from 'react'

export const usePortfolioAbilities = () => {
    const context = useContext(PortfolioAbilitieContext);
    if (!context) {
        throw new Error('conetxt must be used within an AbiliteProvider');
    }
    return context;
};
