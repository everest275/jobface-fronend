import { ReactNode } from "react";
import SMNavbar from './SMNavbar'
import ProyectsNavbar from "./ProyectsNavbar";
import XLNavbar from "./XLNavbar";
interface NavbarProps {
    children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <div>
            <XLNavbar/>
            <SMNavbar />
            <div className="fixed top-20 sm:left-[12rem] w-screen bottom-1 rounded-xl rounded-b-none rounded-r-none flex flex-col items-start border border-[#dddddd] border-r-transparent border-b-transparent p-2 overflow-auto overflow-x-hidden custom-scrollbar scrollbar-gutter-stable">
                <div className="bg-black flex items-start max-w-4xl h-screen">
                    <ProyectsNavbar />
                    {children}
                </div>
            </div>
        </div>

    );
}
export default Navbar