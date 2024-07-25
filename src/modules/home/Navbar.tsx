import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/useAuth';
import addIcon from '../../assets/add-icon.svg';
import listIcon from '../../assets/list-icon.svg';
import personIcon from '../../assets/person.svg';
import exploreIcon from '../../assets/explore.svg';
import homeIcon from '../../assets/home.svg';
import messageIcon from '../../assets/message.svg';
import notificationIcon from '../../assets/notification.svg';
import searchIcon from '../../assets/search.svg';
import { ReactNode } from "react";
interface NavbarProps {
    children: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigator = useNavigate()
    return (
        <div>
            <nav className="fixed bg-transparent flex items-center place-content-around md:place-content-between  w-full h-28">
                <Link to="/">
                    <div className=" absolute left-0 top-0 flex flex-row tracking-widest border border-black mt-3 rounded-xl text-xl font-black p-4 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent md:text-3xl md:hidden">Rourus</div></Link>
                <section className="flex flex-col md:mr-8 absolute right-0 top-0">

                    <div className="p-5 border border-black py-3 flex gap-1 mt-3 rounded-xl bg-[#141414]">

                        {isAuthenticated ? (
                            <>
                                <div className="group relative px-4 cursor-pointer">
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full">
                                        <img src={addIcon} alt="" />
                                    </button>
                                    <div className="bg-[#141414] absolute top-8 left-[50%] w-[300%] -translate-x-[50%] z-20 flex flex-col origin-left scale-0 rounded-lg border border-gray-300 px-3 py-2 text-lg font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                                        <Link to="/add-portfolio"><button className="p-2 text-justify rounded-xl justify-center gap-4 font-semibold hover:bg-zinc-700 w-full">Nuevo portafolio</button></Link>
                                        <button className="p-2 text-justify rounded-xl justify-center gap-4 font-semibold hover:bg-zinc-700 w-full">Nueva tienda</button>
                                    </div>
                                </div>
                                <div className="group relative px-4 cursor-pointer">
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                                        <img src={listIcon} alt="" />
                                    </button>
                                    <div className="absolute top-8 left-[50%] w-[300%] -translate-x-[50%] z-20 flex flex-col origin-left scale-0 rounded-lg border border-gray-300 bg-[#141414] px-3 py-2 text-lg font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                                        <Link to='/portfolios'><button className="p-2 text-justify rounded-xl justify-center gap-4 font-semibold hover:bg-zinc-700 w-full">Mis portafolios</button></Link>
                                        <button className="p-2 text-justify rounded-xl justify-center gap-4 font-semibold hover:bg-zinc-700 w-full">Mis tiendas</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => (navigator('/register'))} className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                                    Register
                                </button>
                                <button onClick={() => (navigator('/login'))} className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </section>

                <section className="fixed bottom-0 -z-10 left-0 h-screen w-1/4 hidden flex-col place-items-stretch pl-8 justify-center text-4xl gap-5 bg-black shadow-black shadow-2xl md:flex min-w-max">
                    <Link to='/' className="flex flex-row tracking-wide shadow-xl rounded-xl text-xl font-black p-4 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent md:text-4xl text">Rourus</Link>
                    <Link to='/' > <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full" ><img src={homeIcon} alt="" /> Inicio</button></Link>
                    <Link to='/' ><button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"> <img src={searchIcon} alt="" />Buscar </button></Link>
                    <Link to="/"> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"> <img src={exploreIcon} alt="" />Explorar</button></Link>
                    <Link to='/'> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"><img src={messageIcon} alt="" />Mensajes</button></Link>
                    <Link to='/'> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"><img src={notificationIcon} alt="" />Notificaciones</button></Link>
                    <Link to='/profile'> <button className="flex items-center rounded-xl p-3 justify-start gap-4 font-semibold hover:bg-zinc-700 w-full"><img src={personIcon} alt="" />Perfil</button></Link>
                </section>
            </nav>
            <div className="absolute top-24 md:left-[50%] -z-10">{children}</div>
        </div>

    );
}
export default Navbar