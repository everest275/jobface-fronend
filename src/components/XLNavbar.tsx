import { Link } from "react-router-dom";
import { useAuth } from '../context/useAuth';
import addPersonIcon from '../assets/add-person.svg';
import loginIcon from '../assets/login.svg';
import personIcon from '../assets/person.svg';
import exploreIcon from '../assets/explore.svg';
import homeIcon from '../assets/home.svg';
import messageIcon from '../assets/message.svg';
import notificationIcon from '../assets/notification.svg';
import searchIcon from '../assets/search.svg';
import { ReactNode } from "react";
import SMNavbar from '../components/SMNavbar'
interface NavbarProps {
    children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            <nav className="hidden xl:flex">
                <section className="fixed bottom-0 z-10 left-0 h-screen w-1/4 flex-col place-items-stretch pl-8 justify-center text-4xl gap-5 bg-black shadow-black shadow-2xl min-w-max">
                    <Link to='/' className="flex flex-row tracking-wide shadow-xl rounded-xl text-xl font-black p-4 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent md:text-4xl text">Authfaces</Link>

                    {isAuthenticated ? (<> <Link to='/' > <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full" ><img src={homeIcon} alt="" /> Inicio</button></Link>
                        <Link to='/' ><button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"> <img src={searchIcon} alt="" />Buscar </button></Link>
                        <Link to="/"> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"> <img src={exploreIcon} alt="" />Explorar</button></Link>
                        <Link to='/'> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"><img src={messageIcon} alt="" />Mensajes</button></Link>
                        <Link to='/'> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"><img src={notificationIcon} alt="" />Notificaciones</button></Link>
                        <Link to='/profile'> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"><img src={personIcon} alt="" />Perfil</button></Link></>) : (<>
                            <Link to='/register' > <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full" ><img src={addPersonIcon} alt="" /> Register</button></Link>
                            <Link to='/login' > <button className="flex items-end rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full" ><img src={loginIcon} alt="" /> Login</button></Link>
                        </>)}
                </section>
                               
            </nav>
            <SMNavbar/>
            <div className="absolute top-20 xl:left-[30%] -z-10">{children}</div>
        </div>

    );
}
export default Navbar