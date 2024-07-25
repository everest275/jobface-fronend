import { useState } from 'react';
import addIcon from '../assets/add-icon.svg'
import tuneIcon from '../assets/tune.svg'
import uploadIcon from '../assets/upload.svg'
import workIcon from '../assets/work.svg'
import { usePortfolios } from '../context/usePortfolios'
import { useNavigate } from 'react-router-dom';


const DropupMenu = () => {
  const { portfolioToEdit } = usePortfolios()
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const navigate= useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenuAdd = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  const handleSave = () => {
    console.log(portfolioToEdit)
  }
  const handleProyect = () => {
    navigate('/add-portfolio-proyect')
  }

  return (
    <div className="absolute right-0 top-2 w-44">
      <div className='flex flex-col gap-2'>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm w-full px-4 py-2 bg-gradient-to-l from-[#9F7AEA] to-[#EC4899] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none -ml-3"
          onClick={toggleMenu}
        >
          <div className='flex justify-center items-start p-2 gap-2'>
            <img src={tuneIcon} alt="" /><h1 className='text-2xl font-bold text-white'>Tune</h1>
          </div>
        </button>


        <div
          className={`text-end origin-bottom-right bottom-full w-full rounded-md shadow-l ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 transform justify-end  ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <div className="flex flex-col items-start gap-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={handleSave} className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm w-full px-4 py-2 bg-gradient-to-l from-[#9F7AEA] to-[#EC4899] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none -ml-3" role="menuitem">

              <div className='flex justify-start items-start p-2 gap-2'>
                <img src={uploadIcon} alt="" /><h1 className='text-2xl font-bold text-white'>Save</h1>
              </div>
            </button>

            <div className='flex flex-col gap-2 items-start w-full'>
              <button onClick={toggleMenuAdd} className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm w-full px-4 py-2 bg-gradient-to-l from-[#9F7AEA] to-[#EC4899] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none -ml-3" role="menuitem">
                <div className='flex justify-start items-start p-2 gap-2'>
                  <img src={addIcon} alt="" /> <h1 className='text-2xl font-bold text-white'>Add</h1>
                </div>
              </button>

              <div className={`text-end origin-bottom-right bottom-full w-full rounded-md shadow-l ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 transform justify-end -ml-3 ${isOpenAdd ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ display: isOpenAdd ? 'block' : 'none' }}>

                <button onClick={handleProyect}className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm w-full px-4 py-2 bg-gradient-to-l from-[#9F7AEA] to-[#EC4899] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none -ml-3" role="menuitem">
                  <div className='flex justify-start items-start p-2 gap-2'>
                    <img src={workIcon} alt="" /> <h1 className='text-2xl font-bold text-white'>Proyect</h1>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropupMenu;
