import { useCallback, useEffect, useState } from "react";
import deleteIcon from '../../assets/delete-icon.svg';
import WriteComment from './PortfolioCommentButton'
import { ClientReviewRoutes } from "./PortfolioReviewConst";
import { deleteRequest, getRequest } from "../../services/RequestService";
import { PortfolioReview } from "./PortfolioReviewInterfaces";
import PortfolioMenus from "../(portfolio)/PortfolioMenus";

const PetitionsReceivedPage = () => {

  const [visibleProjects, setVisibleProjects] = useState<PortfolioReview[]>([]);
  const [projectLimit, setProjectLimit] = useState(8);

  const getPetitions = useCallback(async () => {
    const res = await getRequest(ClientReviewRoutes.RESPONSE)
    setVisibleProjects(res.slice(0, projectLimit));
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
    <>
      <PortfolioMenus />
      <div className='flex flex-col w-screen'>
        <div className='grid grid-cols-1 gap-4'>

          {visibleProjects.map((review, index) => (
            <div key={index} className="flex flex-col items-start border border-black rounded-md w-full">
              <div className="w-full">

              </div>
              <section className="m-3">
                <h3 className="text-white font-semibold text-sm md:text-lg">
                  °{review.review_user.user_name}
                </h3>
                {/* <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 text-lg md:text-xl font-bold">
                  °{review.review_user.user_name}
                </h3> */}
                <h3 className="text-white font-semibold text-sm md:text-lg">{review.portfolio.title}</h3>
                <div className="flex gap-2 flex-wrap content-center mt-2">
                  {/* <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                // onClick={() => handleAceptar(review)}
                >
                  <img src={editIcon} alt="" />aceptar
                </button> */}
                  <WriteComment petition={review} commentType={1} />

                  <button
                    className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                    onClick={() => handleRechazar(review)}>
                    <img src={deleteIcon} alt="" />rechazar
                  </button>
                </div>
              </section>
            </div>


          ))}

        </div>
        {visibleProjects.length <= 0 &&

          <h1 className="mt-[5rem] self-center text-white font-semibold text-sm md:text-lg">No hay solicitudes pendientes</h1>

        }
      </div>
    </>
  )
}
export default PetitionsReceivedPage;