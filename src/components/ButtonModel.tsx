import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
interface ButtonModelProps {
    to?: string;
    action?: () => void;
    children: ReactNode;
}

const ButtonModel: React.FC<ButtonModelProps> = ({ to, action, children }) => {
    const navigator = useNavigate()
    return (
        <button
            onClick={to ? ()=>navigator(to) : action}
            className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center text-sm shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-24"
        >
            {children}
        </button>
    )
}
export default ButtonModel