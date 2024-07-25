import {PortfolioPictureContext} from '../modules/pictures/PictureContext'
import {useContext} from 'react'

export const usePortfolioPictures = () => {
    const context = useContext(PortfolioPictureContext);
    if (!context) {
        throw new Error('conetxt must be used within an AuthProvider');
    }
    return context;
};
