import { useEffect } from "react";
import { usePortfolios } from '../../context/usePortfolios';
import viewIcon from '../../assets/visibility-icon.svg';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import PictureHandler from '../pictures/PictureHandler'
import { useNavigate } from "react-router-dom";

export default function PortfolioPage() {
  const { getPortfolios, portfolios, deletePortfolio } = usePortfolios();

  const navigator = useNavigate()

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  const handleDelete = async (id: string) => {
    await deletePortfolio(id);
  };

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-1 gap-4'>
        {portfolios.map((portfolio, index) => (
          <div key={index} className="flex flex-col items-start p-6 border border-black rounded-md">
            <div className="flex justify-center items-center gap-4">
              <PictureHandler type={1} isViewer={false} isPublic={false} id={portfolio.id} />
              <div className="border-gray-300 flex gap-4 text-xs md:text-sm">
                <div className="flex flex-col items-center"><div className="font-bold">Proyectos</div> <div>0</div></div>
                <div className="flex flex-col items-center"><div className="font-bold">Habilidades</div> <div>0</div></div>
                <div className="flex flex-col items-center"><div className="font-bold">Recomendaciones</div> <div>0</div></div>
              </div>
            </div>
            <section className="m-3">
              <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-lg md:text-xl font-bold">
                {portfolio.title}
              </h3>
              <h3 className="text-white font-semibold text-sm md:text-lg">{portfolio.description}</h3>

              <div className="flex gap-2 flex-wrap content-center mt-2">

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                  onClick={() => navigator(`/portfolio-proyects/${portfolio.id}`)}
                >
                  <img src={viewIcon} alt="" />proyectos
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                
                >
                  <img src={viewIcon} alt="" />habilidades
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                 
                >
                  <img src={viewIcon} alt="" />recomendaciones
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => navigator(`/portfolios/${portfolio.id}`)}
                >
                  <img src={editIcon} alt="" />editar
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                  onClick={() => navigator(`/${portfolio.id}`)}
                >
                  <img src={viewIcon} alt="" />vista
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => handleDelete(portfolio.id)}
                >
                  <img src={deleteIcon} alt="" />eliminar
                </button>
              </div>

            </section>
           
          </div>

        ))}
      </div>
    </div>
  );
}
