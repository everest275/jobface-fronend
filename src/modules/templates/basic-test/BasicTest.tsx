import { useEffect } from "react";
import { useForm } from "react-hook-form";
import proyectsIcon from '../../../assets/work.svg'
import habilitiesIcon from '../../../assets/hablities.svg'
import reviewsIcon from '../../../assets/reviews.svg'
import PictureHandler from '../../pictures/PictureHandler'
import PortfolioProyectPage from "../../portfolio-proyect/PortfolioProyectPage";
import { Portfolio } from "../../portfolio/PortfolioService";
import CarouselMenu from "../../../components/CarouselMenu";

interface BasicTestProps {
  portfolio: Portfolio | null;
}

const BasicTest: React.FC<BasicTestProps> = ({ portfolio }) => {

  const { setValue } = useForm();

  useEffect(() => {
    if (portfolio) {
      setValue("title", portfolio.title);
      setValue("description", portfolio.description);
      setValue("about", portfolio.about);
      setValue("city", portfolio.city);
      setValue("country", portfolio.country);
    }
  }, [portfolio, setValue]);

  if (!portfolio) {
    return <div>No portfolio found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center max-w-screen-2xl mx-auto">
      <section className="self-start md:self-auto flex flex-col gap-3 pl-4 items-center justify-center">
        <div className="flex flex-col-reverse gap-8 md:flex-row">
        <PictureHandler type={1} isViewer={false} isPublic={true} id={portfolio.id} />
          <div className="order-1 border-gray-300 flex gap-4 lg:text-2xl">
            <div className="flex flex-col items-center"><div className="font-bold">Proyectos</div> <div>0</div></div>
            <div className="flex flex-col items-center"><div className="font-bold">Habilidades</div> <div>0</div></div>
            <div className="flex flex-col items-center"><div className="font-bold">Recomendaciones</div> <div>0</div></div>
          </div>
        </div>
        <div className="self-start lg:text-2xl">
          <h1 className="tracking-wide font-bold">{portfolio.title}</h1>
          <h1>{portfolio.description}</h1>
          <h1>{portfolio.city}, {portfolio.country}</h1>
          <h1>{portfolio.about}</h1>
        </div>
      </section>
      <CarouselMenu name1={<img src={proyectsIcon} />} name2={<img src={habilitiesIcon} />} name3={<img src={reviewsIcon} />}
        page1={
          <PortfolioProyectPage/>
        }
        page2={
          <h1>Hola desde habilidades</h1>
        }
        page3={
          <h1>Hola desde recomendaciones</h1>
        }></CarouselMenu>
    </div>
  );
};

export default BasicTest;
