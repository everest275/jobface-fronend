import React, { useEffect, useState } from 'react'
import workIcon from '../../assets/work2.svg'
import abilitesIcon from '../../assets/hablities.svg';
import reviewsIcon from '../../assets/reviews.svg';
import { Link } from 'react-router-dom';
import { getRequest } from '../../services/RequestService'
import { ClientReviewRoutes } from '../(review)/PortfolioReviewConst'
import { ClientPortfolioAbilitieRoutes } from '../(abilitie)/PortfolioAbilitieConst';
import { ClientPortfolioProyectRoutes } from '../(proyect)/PortfolioProyectConst';

interface CounterPortfolioAddsProps {
    portfolioId: string;
}

const CounterPortfolioAdds: React.FC<CounterPortfolioAddsProps> = ({ portfolioId }) => {

    const [abilitiesCounter, setAbilitiesCounter] = useState<number>(0);
    const [reviewsCounter, setReviewsCounter] = useState<number>(0);
    const [proyectsCounter, setProyectsCounter] = useState<number>(0);



    useEffect(() => {
        async function getCounters() {
            const abilities = await getRequest(ClientPortfolioAbilitieRoutes.COUNTER, portfolioId)
            const reviews = await getRequest(ClientReviewRoutes.COUNTER, portfolioId)
            const proyects = await getRequest(ClientPortfolioProyectRoutes.COUNTER,portfolioId)
            setAbilitiesCounter(abilities)
            setReviewsCounter(reviews)
            setProyectsCounter(proyects)
        }
        getCounters()
    });

    return (
        <div className="flex gap-7 sm:gap-20 text-xs font-bold border border-zinc-600 rounded-sm p-4 items-center justify-center">


            <Link className="flex flex-col justify-center items-center" to={`/portfolio-proyects/${portfolioId}`}>
                <div className="flex justify-center items-center gap-1">
                    <img src={workIcon} alt="proyects-icon" />
                    <h1 className="">Works</h1>
                </div>
                {proyectsCounter}
            </Link>


            <Link to={`/portfolio-abilities/${portfolioId}`} className="flex flex-col items-center">
                <div className="flex justify-center items-center gap-1">
                    <img src={abilitesIcon} alt="abilities-icon" />
                    <h1 className="">Skills</h1>
                </div>
                {abilitiesCounter}
            </Link>

            <Link to={`/portfolio-reviews/${portfolioId}`} className="flex flex-col items-center">
                <div className="flex justify-center items-center gap-1">
                    <img src={reviewsIcon} alt="reviews-icon" />
                    <h1 className="">Reviews</h1>
                </div>
                {reviewsCounter}
            </Link>

        </div>
    )
}
export default CounterPortfolioAdds
