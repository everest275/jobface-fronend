import { useEffect } from "react";
import { usePortfolios } from '../../hook/usePortfolios';
import workIcon from '../../assets/work2.svg';
import abilitesIcon from '../../assets/hablities.svg';
import reviewsIcon from '../../assets/reviews.svg';
import PictureHandler from '../picture/PictureHandler'
import { Link, useNavigate } from "react-router-dom";
import { usePortfolioProyects } from '../../hook/usePortfolioProyects'
import { usePortfolioAbilities } from '../../hook/usePortfolioAbilites'
import { usePortfolioReviews } from '../../hook/usePortfolioReviews'

export default function PortfolioPage() {
  const { getPortfolios, portfolios, deletePortfolio, setPortfolios } = usePortfolios();
  const { getPortfolioProyects, portfolioProyects } = usePortfolioProyects();
  const { getPortfolioAbilities, portfolioAbilities } = usePortfolioAbilities()
  const { getPortfolioReviews, portfolioReviews } = usePortfolioReviews()

  const navigator = useNavigate()

  useEffect(() => {
    setPortfolios([])
    getPortfolios();
    getPortfolioAbilities()
    getPortfolioProyects();
    getPortfolioReviews()
  }, [setPortfolios, getPortfolios, getPortfolioProyects, getPortfolioAbilities, getPortfolioReviews]);

  const handleDelete = async (id: string) => {
    await deletePortfolio(id);
  };

  return (
    <div className='flex flex-col w-screen'>
      <button
        onClick={() => navigator(`/add-portfolio`)}
        className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center text-sm shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-48"
      >
        Crear portafolio
      </button>
      <div className='grid grid-cols-1 gap-4'>

        {portfolios.map((portfolio, index) => {
          const projectCount = portfolioProyects.filter(
            (project) => project.portfolio === portfolio.id
          ).length;
          const abilitiesCount = portfolioAbilities.filter(
            (abilitie) => abilitie.portfolio === portfolio.id
          ).length;
          const reviewsCount = portfolioReviews.filter(
            (review) => review.is_accept === "0a1a80e2-7b96-48f1-9a01-5300ff27df36" && review.portfolio.id === portfolio.id
          ).length;


          return (
            <div key={index} className="flex flex-col items-start p-6 border-b border-[#646464]">

              <section className="flex items-end gap-6 sm:gap-20">

                <PictureHandler type={1} isViewer={false} isPublic={false} id={portfolio.id} />

                <section className="flex flex-col gap-10 self-end">

                  <div className="flex gap-7 sm:gap-4 text-xs font-bold">


                    <Link className="flex flex-col justify-center items-center" to={`/portfolio-proyects/${portfolio.id}`}>
                      <div className="flex justify-center items-center gap-1">
                        <img src={workIcon} alt="proyects-icon" />
                        <h1 className="">Works</h1>
                      </div>
                      {projectCount}
                    </Link>


                    <Link to={`/portfolio-abilities/${portfolio.id}`} className="flex flex-col items-center">
                      <div className="flex justify-center items-center gap-1">
                        <img src={abilitesIcon} alt="abilities-icon" />
                        <h1 className="">Skills</h1>
                      </div>
                      {abilitiesCount}
                    </Link>

                    <Link to={`/portfolio-reviews/${portfolio.id}`} className="flex flex-col items-center">
                      <div className="flex justify-center items-center gap-1">
                        <img src={reviewsIcon} alt="reviews-icon" />
                        <h1 className="">Reviews</h1>
                      </div>
                      {reviewsCount}
                    </Link>

                  </div>

                  <div className="flex gap-2 text-xs">

                    <button
                      className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-[60px]"
                      onClick={() => navigator(`/portfolios/${portfolio.id}`)}
                    >
                      Editar
                    </button>

                    <button
                      className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-[60px]"
                      onClick={() => navigator(`/${portfolio.id}`)}
                    >
                      Vista
                    </button>

                    <button
                      className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-[60px]"
                      onClick={() => handleDelete(portfolio.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </section>

              </section>

              <section className="m-3 flex flex-col text-sm ">
                <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 font-semibold">
                  {portfolio.title}
                </h3>
                <h3 className="text-xs">{portfolio.description}</h3>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}
