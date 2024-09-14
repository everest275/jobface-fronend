import { useEffect, useState } from "react";
import { usePortfolioReviews } from "../../../context/usePortfolioReviews";
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete-icon.svg';
import ProyectsNavbar from "../../../components/ProyectsNavbar";
import { PortfolioUserReview, PullPetitionResponse } from "../portfolios&proyects/ReviewService";

const PortfolioProyectPage = () => {


  const { getPetitions, petitions, updatePortfolioReview } = usePortfolioReviews();
  const [visibleProjects, setVisibleProjects] = useState<PortfolioUserReview[]>([]);


  const [projectLimit, setProjectLimit] = useState(8);
  useEffect(() => {

    setVisibleProjects([])

    setVisibleProjects([])
    getPetitions()

  }, [setVisibleProjects, getPetitions])

  useEffect(() => {
    setVisibleProjects([])
    if (petitions && petitions.length > 0) {
      setVisibleProjects([])

      setVisibleProjects(petitions.slice(0, projectLimit));
    }
  }, [setVisibleProjects, getPetitions, petitions, projectLimit]);

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




  console.log(petitions)
  // const handleAceptar = async (obj: PortfolioUserReview) => {
  //   const pullRequest: PullPetitionResponse = {
  //     reviewer_user: obj.reviewer_user,
  //     review_user: obj.review_user.id,
  //     portfolio: obj.portfolio.id,
  //     comment: obj.comment,
  //     is_accept: "0a1a80e2-7b96-48f1-9a01-5300ff27df36",
  //     review_state: obj.review_state
  //   };
  //   console.log(pullRequest)
  //   updatePortfolioReview(obj.id,pullRequest)

  // }

  const handleRechazar = async (obj: PortfolioUserReview) => {
    const pullRequest: PullPetitionResponse = {
      reviewer_user: obj.reviewer_user,
      review_user: obj.review_user.id,
      portfolio: obj.portfolio.id,
      comment: obj.comment,
      is_accept: "860236b5-83b5-41b9-b80e-1c896174f427",
      review_state: obj.review_state
    };
    console.log(pullRequest)
    updatePortfolioReview(obj.id, pullRequest)
    location.reload()

  }

  if (visibleProjects.length <= 0) {
    return <div>
      <ProyectsNavbar />
      <div className="flex gap-2">
      </div>
      <h1 className="text-white font-semibold text-sm md:text-lg">No hay solicitudes pendientes</h1>
    </div>;
  }
  return (
    <div className='flex flex-col'>
      <ProyectsNavbar />
      <div className="flex gap-2">

      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

        {visibleProjects.map((review, index) => (
          <div key={index} className="flex flex-col items-start border border-black rounded-md w-[600px]">
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
                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                // onClick={() => handleAceptar(review)}
                >
                  <img src={editIcon} alt="" />aceptar
                </button>

                <button
                  className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"
                  onClick={() => handleRechazar(review)}>
                  <img src={deleteIcon} alt="" />rechazar
                </button>
              </div>
            </section>
          </div>


        ))}
        {petitions && petitions.length === 0 && (
          <h1 className="text-white font-semibold text-sm md:text-lg">No hay solicitudes pendientes</h1>
        )}
      </div>
    </div>
  )
}
export default PortfolioProyectPage;