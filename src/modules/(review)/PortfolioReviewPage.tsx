import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import RequestsButton from './PortfolioRequestsButton'
import PortfolioPetitionsButton from './PortfolioPetitionsButton'
import { ClientReviewRoutes } from './PortfolioReviewConst'
import { PortfolioReview } from './PortfolioReviewInterfaces'
import { useRequestServices } from "../../services/RequestService";

export const PortfolioProyectPage = () => {

  const { id } = useParams<{ id: string }>();
  const { getRequest, deleteRequest } = useRequestServices();

  const [visibleProjects, setVisibleProjects] = useState<PortfolioReview[]>([]);
  const navigate = useNavigate()
  const [projectLimit, setProjectLimit] = useState(8);
  const [showAnimation, setShowAnimation] = useState(false); // Estado para controlar la animación

  const getReviews = useCallback(async () => {
    const res = await getRequest(ClientReviewRoutes.SUCCESS, id)
    setVisibleProjects(res.slice(0, projectLimit));
    setShowAnimation(true);
  }, [getRequest,id, projectLimit])

  useEffect(() => {
    getReviews()
  }, [getReviews])

  useEffect(() => {
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
  });

  const handleDelete = async (id: string) => {
    await deleteRequest(ClientReviewRoutes.PRIVATE, id)
    getReviews()
  };

  return (
    <div className={`mt-16 flex flex-col w-screen items-center transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
      <div className="fixed gap-2">
        <PortfolioPetitionsButton id={id ? id : ""} />
        <RequestsButton id={id ? id : ""} />
      </div>
      <div className='mt-[5rem] grid grid-cols-1 gap-4'>
        {visibleProjects.map((review, index) => (
          <div key={index} className="flex flex-col items-start border border-black rounded-md w-full">
            <div className="w-full">
            </div>
            <section className="m-3">
              <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-lg md:text-xl font-bold">
                {review.reviewer_user.user_name}
              </h3>
              <h3 className="text-white font-semibold text-sm md:text-lg">{review.comment}</h3>
              <div className="flex gap-2 flex-wrap content-center mt-2">
                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => navigate(`/portfolio-abilitie/${review.id}/${id}`)}>
                  <img src={editIcon} alt="" />ocultar
                </button>
                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => handleDelete(review.id)}>
                  <img src={deleteIcon} alt="" />eliminar
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>
      {visibleProjects.length === 0 &&
        <h1 className="mt-[5rem] self-center text-white font-semibold text-sm md:text-lg">No hay recomendaciones creadas</h1>
      }
      {!id &&
        <h1 className="mt-[5rem] self-center text-white font-semibold text-sm md:text-lg">No se encontro portafolio</h1>
      }
    </div>
  )
}
export default PortfolioProyectPage;