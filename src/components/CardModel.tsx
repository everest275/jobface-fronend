import { ReactNode } from "react";

interface CardModelProps {  
    children: ReactNode;
}

const CardModel: React.FC<CardModelProps> = ({ children }) => {
    return (
        <div  className="flex flex-col items-center justify-center border-b border-[#646464] p-4">
            {children}
        </div>
    )
}
export default CardModel
