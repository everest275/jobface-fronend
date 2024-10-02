import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PictureHandler from '../(picture)/PictureHandler'
import viewIcon from '../../assets/visibility-icon.svg';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import { deleteRequest, getRequest } from "../../services/RequestService";
import { ClientPortfolioProyectRoutes } from "./PortfolioProyectConst";

interface Project {
  id: string;
  portfolio: string;
  position: string;
  title: string;
  description: string;
}

export const PortfolioProyectPage = () => {

  const { id } = useParams<{ id: string }>();
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const navigate = useNavigate()
  const [projectLimit, setProjectLimit] = useState(8);

  const getProyects = useCallback(async () => {
    const res = await getRequest(ClientPortfolioProyectRoutes.PUBLIC, id)
    setVisibleProjects(res.slice(0, projectLimit));
  }, [id, projectLimit])


  useEffect(() => {
    getProyects()
  }, [getProyects]);


  useEffect(() => {
    setVisibleProjects([])
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= documentHeight - 5) {
        setProjectLimit(prevLimit => prevLimit + 8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setVisibleProjects]);


  const handleDelete = async (portfolioId: string) => {
    await deleteRequest(ClientPortfolioProyectRoutes.PRIVATE, portfolioId)
    getProyects()
  };

  if (!id) {
    return <div>
      <div className="text-white font-semibold text-sm md:text-lg">No se encontro el portafolio</div>
    </div>;
  }

  if (visibleProjects.length <= 0) {
    return <div>
      <button
        onClick={() => navigate(`/add-portfolio-proyect/${id}`)}
        className="tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9 w-60"
      >
        Crear nuevo proyecto
      </button>
      <h1 className="text-white font-semibold text-sm md:text-lg">No hay proyectos creados, crear un nuevo proyecto para ver</h1>
    </div>;
  }


  return (
    <div className='flex flex-col'>
      <button
        onClick={() => navigate(`/add-portfolio-proyect/${id}`)}
        className="tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9 w-60"
      >
        Crear nuevo proyecto
      </button>
      <div className='grid grid-cols-1 gap-4'>
        {visibleProjects.map((proyect, index) => (
          <div key={index} className="flex flex-col items-start border border-black rounded-md w-full">
            <div className="w-full">
              <PictureHandler type={2} isViewer={false} isPublic={false} id={proyect.id} />
            </div>
            <section className="m-3">
              <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-lg md:text-xl font-bold">
                {proyect.title}
              </h3>
              <h3 className="text-white font-semibold text-sm md:text-lg">{proyect.position}</h3>
              <h3 className="text-white font-semibold text-sm md:text-lg">{proyect.description}</h3>
              <div className="flex gap-2 flex-wrap content-center mt-2">

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => navigate(`/portfolio-proyect/${proyect.id}/${id}`)}
                >
                  <img src={editIcon} alt="" />editar
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center"
                  onClick={() => navigate(`/${proyect.id}`)}
                >
                  <img src={viewIcon} alt="" />vista
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => handleDelete(proyect.id)}
                >
                  <img src={deleteIcon} alt="" />eliminar
                </button>

              </div>

            </section>

          </div>

        ))}
        {visibleProjects.length <= 0 && (<h1>No proyects found</h1>)}
      </div>
    </div>
  )
}
export default PortfolioProyectPage;