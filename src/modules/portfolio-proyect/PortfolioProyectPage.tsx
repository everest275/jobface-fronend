import { useEffect, useState } from "react";
import { usePortfolioProyects } from "../../context/usePortfolioProyects";
import { useNavigate, useParams } from "react-router-dom";

interface Project {
    id: string;
    portfolio: string;
    position: string;
    title: string;
    description: string;
}

export const PortfolioProyectPage = () => {

    const { id } = useParams<{ id: string }>();
    const { publicGetPortfolioProyectsByPortfolio, portfolioProyects } = usePortfolioProyects();
    const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
    const navigate=useNavigate()

    const [projectLimit, setProjectLimit] = useState(8);
    useEffect(() => {

        if (portfolioProyects.length > 0) {

            setVisibleProjects(portfolioProyects.slice(0, projectLimit));

        }

    }, [publicGetPortfolioProyectsByPortfolio, id, portfolioProyects, projectLimit]);


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
    }, [publicGetPortfolioProyectsByPortfolio, id]);

    useEffect(() => {
        if (id) {
            publicGetPortfolioProyectsByPortfolio(id)
        }

    }, [publicGetPortfolioProyectsByPortfolio, id])


    if (!id) {
        return <div>No portfolio found</div>;
    }
    return (
        <section>

<button className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center" onClick={()=> navigate(`/add-portfolio-proyect/${id}`)} >agregar proyecto</button>


            {visibleProjects.map((proyect) => (
                <div key={proyect.id}>
                    <h1>
                        {proyect.title}
                        {proyect.position}
                        {proyect.description}
                    </h1>
                    <button className="tracking-wide py-2 px-4 bg-zinc-800 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2 justify-center items-center content-center" onClick={()=> navigate(`/portfolio-proyect/${proyect.id}`)} >editar proyecto</button>
                </div>
            ))}

        </section>
    )
}
export default PortfolioProyectPage;