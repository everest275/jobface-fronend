// import { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom';
import listIcon from '../assets/list-icon.svg'
import addIcon from '../assets/add-icon.svg'
import petitionsIcon from '../assets/petition-received.svg'
import { useNavigate } from 'react-router-dom'
export default function ProyectsNavbar() {

    const navigate = useNavigate()

    // const [isAddDropdownOpen, setAddDropdownOpen] = useState(false);
    // const [isListDropdownOpen, setListDropdownOpen] = useState(false);
    // const addDropdownRef = useRef<HTMLDivElement>(null);
    // const listDropdownRef = useRef<HTMLDivElement>(null);

    // const handleClickOutside = (event: MouseEvent) => {
    //     if (addDropdownRef.current && !addDropdownRef.current.contains(event.target as Node)) {
    //         setAddDropdownOpen(false);
    //     }
    //     if (listDropdownRef.current && !listDropdownRef.current.contains(event.target as Node)) {
    //         setListDropdownOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <nav className='fixed flex top-0 z-50 right-0 w-full justify-end items-center '>
             
            <div className='flex bg-transparent w-full justify-end py-5 text-xs font-semibold gap-3'>
               

                <div className="relative"
                // ref={addDropdownRef}
                >
                    <button
                        onClick={() => navigate('/add-portfolio')}
                        // onClick={() => setAddDropdownOpen(!isAddDropdownOpen)} 
                        className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full">
                        <img src={addIcon} alt="" />
                        <h1 className='sm:flex hidden'>Crear</h1>
                    </button>
                    {/* {isAddDropdownOpen && (
            <div className="absolute z-10 bg-[#141414] rounded-lg">
                <Link to='/add-portfolio' className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center">portafolio</Link>
                
            </div>
        )} */}
                </div>

                <div className="relative"
                //  ref={listDropdownRef}
                >
                    <button
                        onClick={() => navigate('/portfolios')}
                        // onClick={() => setListDropdownOpen(!isListDropdownOpen)} 
                        className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full">
                        <img src={listIcon} alt="" />
                        <h1 className='sm:flex hidden'>Proyectos</h1>
                    </button>
                    {/* {isListDropdownOpen && (
            <div className="absolute z-10 bg-[#141414] rounded-lg flex flex-col gap-2">
                <Link to='/portfolios' className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center">mis portafolios</Link>
               
            </div>
            
        )} */}
                </div>

                <div className="relative"
                //  ref={listDropdownRef}
                >
                    <button
                        onClick={() => navigate('/petitons-received')}
                        // onClick={() => setListDropdownOpen(!isListDropdownOpen)} 
                        className="flex items-center rounded-xl p-3 justify-start gap-1 transition ease-in duration-200 hover:bg-[#646464] w-full">
                        <img src={petitionsIcon} alt="" />
                        <h1 className='sm:flex hidden'>Peticiones</h1>
                    </button>
                    {/* {isListDropdownOpen && (
            <div className="absolute z-10 bg-[#141414] rounded-lg flex flex-col gap-2">
                <Link to='/portfolios' className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center">mis portafolios</Link>
               
            </div>
            
        )} */}
                </div>

            </div>
        </nav>)
}
