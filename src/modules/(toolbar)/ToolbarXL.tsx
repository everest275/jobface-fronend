import addPersonIcon from '../../assets/add-person.svg';
import loginIcon from '../../assets/login.svg';
import personIcon from '../../assets/person.svg';
import exploreIcon from '../../assets/explore.svg';
import homeIcon from '../../assets/home.svg';
import messageIcon from '../../assets/message.svg';
import notificationIcon from '../../assets/notification.svg';
import searchIcon from '../../assets/search.svg';
import { useAuth } from '../../hook/useAuthfaceContext';

import { Link } from 'react-router-dom'

export default function XLNavbar() {
    const { isAuthenticated } = useAuth();
    return (
        <nav>
            <section className="fixed top-2 left-4 h-screen flex-col text-sm gap-5 font-semibold">

                <Link to='/' className="flex flex-row tracking-wide shadow-xl rounded-xl text-xl font-black p-4 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                    Authfaces
                </Link>

                {isAuthenticated ? (
                    <div className="sm:flex flex-col hidden gap-3">
                        <Link to='/' > <button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full" ><img src={homeIcon} alt="" />
                            Inicio
                        </button></Link>
                        <Link to='/' ><button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full"> <img src={searchIcon} alt="" />
                            Buscar
                        </button></Link>
                        <Link to="/"> <button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full"> <img src={exploreIcon} alt="" />
                            Explorar
                        </button></Link>
                        <Link to='/'> <button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full"><img src={messageIcon} alt="" />
                            Mensajes
                        </button></Link>
                        <Link to='/'> <button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full"><img src={notificationIcon} alt="" />
                            Notificaciones
                        </button></Link>
                        <Link to='/profile'> <button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full"><img src={personIcon} alt="" />
                            Perfil
                        </button></Link>
                    </div>
                ) : (
                    <div>
                        <Link to='/register' > <button className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full" ><img src={addPersonIcon} alt="" /> Register</button></Link>
                        <Link to='/login' > <button className="flex items-end rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full" ><img src={loginIcon} alt="" /> Login</button></Link>
                    </div>
                )}
                
            </section>

        </nav>
    )
}
