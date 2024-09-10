// import { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom';
import listIcon from '../assets/list-icon.svg'
import addIcon from '../assets/add-icon.svg'
import { useNavigate } from 'react-router-dom'
export default function ProyectsNavbar() {

    const navigate=useNavigate()

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
    <nav className='fixed flex top-0 z-20 right-0 w-full justify-end items-center'>
    <div className='flex bg-[#141414] w-full justify-end py-5'>
    <div className="relative" 
    // ref={addDropdownRef}
    >
        <button 
         onClick={()=>navigate('/add-portfolio')}
            // onClick={() => setAddDropdownOpen(!isAddDropdownOpen)} 
            className="tracking-wide py-2 px-4 transition ease-in duration-200 text-center text-base font-semibold rounded-lg flex gap-2 justify-center items-center content-center">
            <img src={addIcon} alt="" />Crear 
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
        onClick={()=>navigate('/portfolios')}
            // onClick={() => setListDropdownOpen(!isListDropdownOpen)} 
            className="tracking-wide py-2 px-4 transition ease-in duration-200 text-center text-base font-semibold rounded-lg flex gap-2 justify-center items-center content-center">
            <img src={listIcon} alt="" />Proyectos 
        </button>
        {/* {isListDropdownOpen && (
            <div className="absolute z-10 bg-[#141414] rounded-lg flex flex-col gap-2">
                <Link to='/portfolios' className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center">mis portafolios</Link>
               
            </div>
            
        )} */}
    </div>
    </div>
</nav>  )
}
