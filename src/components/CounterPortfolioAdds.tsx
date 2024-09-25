import React, { useEffect } from 'react'
import { usePortfolioProyects } from '../hook/usePortfolioProyects'
import { usePortfolioAbilities } from '../hook/usePortfolioAbilites'
import { usePortfolioReviews } from '../hook/usePortfolioReviews'
import workIcon from '../assets/work2.svg'
import abilitesIcon from '../assets/hablities.svg';
import reviewsIcon from '../assets/reviews.svg';
import { Link } from 'react-router-dom';

interface CounterPortfolioAddsProps {
    portfolioId: string;

}

const CounterPortfolioAdds: React.FC<CounterPortfolioAddsProps> = ({ portfolioId }) => {

    const { getPortfolioProyects, portfolioProyects } = usePortfolioProyects();
    const { getPortfolioAbilities, portfolioAbilities } = usePortfolioAbilities()
    const { getPortfolioReviews, portfolioReviews } = usePortfolioReviews()

    useEffect(() => {
        getPortfolioAbilities()
        getPortfolioProyects();
        getPortfolioReviews()
    }, [getPortfolioProyects, getPortfolioAbilities, getPortfolioReviews]);

    const projectCount = portfolioProyects.filter(
        (project) => project.portfolio === portfolioId
    ).length;
    const abilitiesCount = portfolioAbilities.filter(
        (abilitie) => abilitie.portfolio === portfolioId
    ).length;
    const reviewsCount = portfolioReviews.filter(
        (review) => review.is_accept === "0a1a80e2-7b96-48f1-9a01-5300ff27df36" && review.portfolio.id === portfolioId
    ).length;

    return (
        <div className="flex gap-7 sm:gap-4 text-xs font-bold">


            <Link className="flex flex-col justify-center items-center" to={`/portfolio-proyects/${portfolioId}`}>
                <div className="flex justify-center items-center gap-1">
                    <img src={workIcon} alt="proyects-icon" />
                    <h1 className="">Works</h1>
                </div>
                {projectCount}
            </Link>


            <Link to={`/portfolio-abilities/${portfolioId}`} className="flex flex-col items-center">
                <div className="flex justify-center items-center gap-1">
                    <img src={abilitesIcon} alt="abilities-icon" />
                    <h1 className="">Skills</h1>
                </div>
                {abilitiesCount}
            </Link>

            <Link to={`/portfolio-reviews/${portfolioId}`} className="flex flex-col items-center">
                <div className="flex justify-center items-center gap-1">
                    <img src={reviewsIcon} alt="reviews-icon" />
                    <h1 className="">Reviews</h1>
                </div>
                {reviewsCount}
            </Link>

        </div>
    )
}
export default CounterPortfolioAdds
