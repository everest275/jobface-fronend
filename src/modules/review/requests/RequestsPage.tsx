import { useEffect, useState } from "react";
import { usePortfolioReviews } from "../../../context/usePortfolioReviews";
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete-icon.svg';
import ProyectsNavbar from "../../../components/ProyectsNavbar";
import { PortfolioReview, userPortfolioReview } from "../portfolios&proyects/ReviewService";

interface PortfolioProyectPageProps {
  id: string;
}

const PortfolioProyectPage: React.FC<PortfolioProyectPageProps> = ({ id }) => {


  const { publicGetPortfolioReviewsByPortfolio, portfolioReviews, responseUserPortfolioReview, deletePortfolioReview, pendingReviewsByPortfolio, pendingPortfolioReviews } = usePortfolioReviews();
  const [visibleProjects, setVisibleProjects] = useState<PortfolioReview[]>([]);


  const [projectLimit, setProjectLimit] = useState(8);
  useEffect(() => {
    setVisibleProjects([])
    if (portfolioReviews.length > 0) {
      setVisibleProjects([])

      setVisibleProjects(portfolioReviews.slice(0, projectLimit));
    }
  }, [setVisibleProjects, publicGetPortfolioReviewsByPortfolio, id, portfolioReviews, projectLimit]);

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
      publicGetPortfolioReviewsByPortfolio(id)
      pendingReviewsByPortfolio(id)

    }

  }, [setVisibleProjects, publicGetPortfolioReviewsByPortfolio, pendingReviewsByPortfolio, id])



  const handleAceptar = async (obj: PortfolioReview) => {
    const pullRequest: userPortfolioReview = {
      reviewer_user: obj.reviewer_user.id,
      portfolio: obj.portfolio.id,
      comment: obj.comment,
      is_accept: "0a1a80e2-7b96-48f1-9a01-5300ff27df36",
      review_state: obj.review_state // Assuming this is a constant value
    };
    console.log(pullRequest)
    await responseUserPortfolioReview(obj.id, pullRequest);
    publicGetPortfolioReviewsByPortfolio(id)
    pendingReviewsByPortfolio(id)

  }

  const handleRechazar = async (obj: PortfolioReview) => {
    await deletePortfolioReview(obj.id);
    publicGetPortfolioReviewsByPortfolio(id)
    pendingReviewsByPortfolio(id)

  }


  if (!id) {
    return <div>
      <ProyectsNavbar />
      <div className="text-white font-semibold text-sm md:text-lg">No se encontro portafolio</div>
    </div>;
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
      <div className='grid grid-cols-1 gap-4'>

        {visibleProjects.map((review, index) => (
          review.is_accept === "a295ecf9-2c6d-4908-adbd-f2520bd8b274" && (
            <div key={index} className="flex flex-col items-start border border-black rounded-md w-[600px]">
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
                    onClick={() => handleAceptar(review)}>
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
          )

        ))}
        {pendingPortfolioReviews.length === 0 && (
          <h1 className="text-white font-semibold text-sm md:text-lg">No hay solicitudes pendientes</h1>
        )}
      </div>
    </div>
  )
}
export default PortfolioProyectPage;