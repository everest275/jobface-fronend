import {PortfolioReviewContext} from '../context/ReviewContext'
import {useContext} from 'react'

export const usePortfolioReviews = () => {
    const context = useContext(PortfolioReviewContext);
    if (!context) {
        throw new Error('conetxt must be used within an AbiliteProvider');
    }
    return context;
};
