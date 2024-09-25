import { useEffect, useState } from "react";
import { usePortfolioReviews } from "../../../hook/usePortfolioReviews";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete-icon.svg';
import RequestsButton from '../requests/RequestsButton'
import PetitionsButton from '../petitions/PetitionsButton'
import { PortfolioReview } from "../../../services/ReviewService";

export const PortfolioProyectPage = () => {

  const { id } = useParams<{ id: string }>();
  const { publicGetPortfolioReviewsByPortfolio, portfolioReviews, deletePortfolioReview, successPortfolioReviews, successReviewsByPortfolio } = usePortfolioReviews();
  const [visibleProjects, setVisibleProjects] = useState<PortfolioReview[]>([]);
  const navigate = useNavigate()
  const [projectLimit, setProjectLimit] = useState(8);

  useEffect(() => {
    setVisibleProjects([])
    if (id) {
      setVisibleProjects([])
      publicGetPortfolioReviewsByPortfolio(id)
      successReviewsByPortfolio(id)

    }
  }, [setVisibleProjects, publicGetPortfolioReviewsByPortfolio, successReviewsByPortfolio, id])

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

  const handleDelete = async (id: string) => {
    await deletePortfolioReview(id);
    location.reload()
  };

  if (!id) {
    return <div>
      <div className="text-white font-semibold text-sm md:text-lg">No se encontro portafolio</div>
    </div>;
  }

  if (successPortfolioReviews.length === 0) {
    return <div>
      <div className="flex gap-2">
        <RequestsButton id={id} />
        <PetitionsButton id={id} />
      </div>
      <h1 className="text-white font-semibold text-sm md:text-lg">No hay recomendaciones creadas</h1>
    </div>;
  }
  return (
    <div className='flex flex-col'>
      <div className="flex gap-2">
        <PetitionsButton id={id} />
        <RequestsButton id={id} />
      </div>
      <div className='grid grid-cols-1 gap-4'>
        {visibleProjects.map((review, index) => (
          review.is_accept === "0a1a80e2-7b96-48f1-9a01-5300ff27df36" && (
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
          )
        ))}

      </div>
    </div>
  )
}
export default PortfolioProyectPage;