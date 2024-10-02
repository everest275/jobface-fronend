import { ReactNode } from "react";
import ToolbarSM from './ToolbarSM'
import ToolbarProyects from "./ToolbarProyects";
import ToolbarXL from "./ToolbarXL";
interface NavbarProps {
    children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <div>
            <ToolbarXL />
            <ToolbarSM />
            <div className="fixed top-20 sm:left-[12rem] max-w-7xl bottom-1 rounded-xl rounded-b-none rounded-r-none flex flex-col items-start border border-zinc-600 border-r-transparent border-b-transparent overflow-auto overflow-x-hidden custom-scrollbar scrollbar-gutter-stable">
                <div className="bg-black flex items-start max-w-4xl h-screen">
                    <ToolbarProyects />
                    {children}
                </div>
            </div>
        </div>

    );
}
export default Navbar