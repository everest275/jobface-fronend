import { useEffect } from "react";
import { usePortfolios } from '../../context/usePortfolios';
import viewIcon from '../../assets/visibility-icon.svg';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import workIcon from '../../assets/work2.svg';
import abilitesIcon from '../../assets/hablities.svg';
import reviewsIcon from '../../assets/reviews.svg';
import PictureHandler from '../picture/portfolios&proyects/PictureHandler'
import { useNavigate } from "react-router-dom";
import ProyectsNavbar from "../../components/ProyectsNavbar";
import { usePortfolioProyects } from '../../context/usePortfolioProyects'

export default function PortfolioPage() {
  const { getPortfolios, portfolios, deletePortfolio, setPortfolios } = usePortfolios();
  const { getPortfolioProyects, portfolioProyects } = usePortfolioProyects();

  const navigator = useNavigate()

  useEffect(() => {
    setPortfolios([])
    getPortfolios();
    getPortfolioProyects();
  }, [setPortfolios, getPortfolios, getPortfolioProyects]);

  const handleDelete = async (id: string) => {
    await deletePortfolio(id);
  };

  return (
    <div className='flex flex-col'>
      <ProyectsNavbar />
      <button
          onClick={() => navigator(`/add-portfolio`)}
          className="tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9 w-60"
        >
          Crear nuevo portafolio
        </button>
      <div className='grid grid-cols-1 gap-4'>
        
        {portfolios.map((portfolio, index) => {
          const projectCount = portfolioProyects.filter(
            (project) => project.portfolio === portfolio.id
          ).length;

          return (
            <div key={index} className="flex flex-col items-start p-6 border border-black rounded-md">
              <div className="flex justify-center items-center gap-4">
                <PictureHandler type={1} isViewer={false} isPublic={false} id={portfolio.id} />
                <div className="border-gray-300 flex gap-4 text-xs md:text-2xl">
                  <div className="flex flex-col items-center"><div className="font-bold">Proyectos</div> <div>{projectCount}</div></div>
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
                    <img src={workIcon} alt="" />proyectos
                  </button>

                  <button
                    className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                    onClick={() => navigator(`/portfolio-abilities/${portfolio.id}`)}
                  >
                    <img src={abilitesIcon} alt="" />habilidades
                  </button>

                  <button
                    className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                    onClick={() => navigator(`/portfolio-reviews/${portfolio.id}`)}
                  >
                    <img src={reviewsIcon} alt="" />recomendaciones
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
          );
        })}
      </div>
    </div>
  );
}
