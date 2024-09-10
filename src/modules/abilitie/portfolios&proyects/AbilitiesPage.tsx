import { useEffect, useState } from "react";
import { usePortfolioAbilities } from "../../../context/usePortfolioAbilites";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete-icon.svg';
import ProyectsNavbar from "../../../components/ProyectsNavbar";

interface PortfolioAbilitie {
  id: string
  abilitie_type: {
    type:string,
    type_value:string,
    state:string
};
  portfolio: string;
  comment: string;
  abilitie_state: string;
}

export const PortfolioProyectPage = () => {

  const { id } = useParams<{ id: string }>();
  const { publicGetPortfolioAbilitiesByPortfolio, portfolioAbilities, deletePortfolioAbilitie, } = usePortfolioAbilities();
  const [visibleProjects, setVisibleProjects] = useState<PortfolioAbilitie[]>([]);
  const navigate = useNavigate()

  const [projectLimit, setProjectLimit] = useState(8);
  useEffect(() => {
    setVisibleProjects([])
    if(portfolioAbilities!=null){
    if (portfolioAbilities.length > 0 ) {
      setVisibleProjects([])

      setVisibleProjects(portfolioAbilities.slice(0, projectLimit));
    }}
  }, [setVisibleProjects, publicGetPortfolioAbilitiesByPortfolio, id, portfolioAbilities, projectLimit]);


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

  useEffect(() => {

    setVisibleProjects([])
    if (id) {
      setVisibleProjects([])
      publicGetPortfolioAbilitiesByPortfolio(id)
    }
  }, [setVisibleProjects, publicGetPortfolioAbilitiesByPortfolio, id])

  console.log(portfolioAbilities)
  const handleDelete = async (id: string) => {
    await deletePortfolioAbilitie(id);
  };


  if (!id) {
    return <div>
      <ProyectsNavbar />
      <div className="text-white font-semibold text-sm md:text-lg">No se encontro portafolio</div>
    </div>;
  }

  if (visibleProjects.length <= 0) {
    return <div>
      <ProyectsNavbar />
      <button
        onClick={() => navigate(`/add-portfolio-abilitie/${id}`)}
        className="tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9 w-60">
        Crear nueva habilidad
      </button>
      <h1 className="text-white font-semibold text-sm md:text-lg">No hay habilidades creados, crear un nueva habilidad para ver</h1>
    </div>;
  }
  return (
    <div className='flex flex-col'>
      <ProyectsNavbar />
      <button
          onClick={() => navigate(`/add-portfolio-abilitie/${id}`)}
          className="tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9 w-60">
          Crear nueva habilidad
        </button>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
       
        {visibleProjects.map((abilitie, index) => (
          <div key={index} className="flex flex-col items-start border border-black rounded-md w-[600px]">
            <div className="w-full">

            </div>
            <section className="m-3">
              <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-lg md:text-xl font-bold">
                {abilitie.abilitie_type.type_value}
              </h3>
              <h3 className="text-white font-semibold text-sm md:text-lg">{abilitie.comment}</h3>
              <div className="flex gap-2 flex-wrap content-center mt-2">
                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => navigate(`/portfolio-abilitie/${abilitie.id}/${id}`)}>
                  <img src={editIcon} alt="" />editar
                </button>
                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => handleDelete(abilitie.id)}>
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