import { useCallback, useEffect, useState } from "react";
import WriteComment from './PortfolioCommentButton'
import { ClientReviewRoutes } from "./PortfolioReviewConst";
import { deleteRequest, getRequest } from "../../services/RequestService";
import { PortfolioReview } from "./PortfolioReviewInterfaces";
import CardModel from "../../components/CardModel";
import ButtonModel from "../../components/ButtonModel";

const PetitionsReceivedPage = () => {

  const [visibleProjects, setVisibleProjects] = useState<PortfolioReview[]>([]);
  const [projectLimit, setProjectLimit] = useState(8);
  const [showAnimation, setShowAnimation] = useState(false);

  const getPetitions = useCallback(async () => {
    const res = await getRequest(ClientReviewRoutes.RESPONSE)
    setVisibleProjects(res.slice(0, projectLimit));
    setShowAnimation(true);
  }, [projectLimit])

  useEffect(() => {
    setVisibleProjects([])
    getPetitions()
  }, [setVisibleProjects, getPetitions])

  useEffect(() => {
    getPetitions()
  }, [getPetitions]);

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

  const handleRechazar = async (obj: PortfolioReview) => {
    await deleteRequest(ClientReviewRoutes.PRIVATE, obj.id)
    getPetitions()
  }

  return (

    <div className={`mt-16 flex flex-col w-screen items-center transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
      <div className='grid grid-cols-1 gap-4 mt-[5rem] w-full'>

        {/* Se recorren las peticiones */}
        {visibleProjects.map((review, index) => (
          // Se integran a cards
          <CardModel key={index}>
            <article className="p-4">
              <header>
                <h3 className="text-white font-semibold text-sm md:text-lg">
                  °{review.review_user.user_name}
                </h3>
                <h3 className="text-white font-semibold text-sm md:text-lg">{review.portfolio.title}</h3>
              </header>
              <div className="flex gap-2 content-center mt-2">
                <WriteComment petition={review} commentType={1} />
                <ButtonModel action={() => handleRechazar(review)}>
                  Rechazar
                </ButtonModel>
              </div>
            </article>
          </CardModel>
        ))}
      </div>
      {/* Mensaje de no existen peticiones */}
      {visibleProjects.length <= 0 &&
        <h1 className="mt-[5rem] self-center text-white font-semibold text-sm md:text-lg">No hay solicitudes pendientes</h1>
      }
    </div>
  )
}
export default PetitionsReceivedPage;