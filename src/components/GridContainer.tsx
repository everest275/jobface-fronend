import React, { ReactNode } from 'react'

interface GridContainerProps {
    children: ReactNode;
}
const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
    return (
        <div className='grid grid-cols-1 gap-4 w-full' >
            {children}
        </div>
    )
}
export default GridContainer
