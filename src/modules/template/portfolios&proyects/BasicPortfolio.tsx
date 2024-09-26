import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import proyectsIcon from '../../../assets/work2.svg'
import habilitiesIcon from '../../../assets/hablities.svg'
import reviewsIcon from '../../../assets/reviews.svg'
import PictureHandler from '../../picture/PictureHandler'
import PortfolioProyectPage from "../../proyect/portfolios/PortfolioProyectPage";
import CarouselMenu from "../../../components/CarouselMenu";
import { useParams } from "react-router-dom";
import WriteComment from '../../review/petitions/WriteCommentButton';
import CounterPortfolioAdds from "../../../components/CounterPortfolioAdds";
import { Portfolio } from '../../portfolio/PortfolioInterfaces'
import { getRequest } from '../../../services/RequestService'
import { ClientPortfolioRoutes } from '../../portfolio/PortfolioConst'

const BasicTest = () => {

  const { setValue } = useForm();
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio>();

  async function getPortfolio(){
    const res = await getRequest(ClientPortfolioRoutes.PUBLIC,id)
    setPortfolio(res)
  }

  useEffect(() => {
   getPortfolio()
  })

  useEffect(() => {
      setValue("title", portfolio?.title);
      setValue("description", portfolio?.description);
      setValue("about", portfolio?.about);
      setValue("city", portfolio?.city);
      setValue("country", portfolio?.country);
  }, [id,portfolio,setValue]);

  if (!portfolio) {
    return <div>No portfolio found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center max-w-screen-2xl mx-auto mt-20">
      <section className="self-start md:self-auto flex flex-col gap-3 pl-4 items-center justify-center">

        <div className="flex items-center justify-center gap-5">
          <div>
            <PictureHandler type={1} isViewer={false} isPublic={true} id={portfolio.id} />
          </div>
          <CounterPortfolioAdds portfolioId={id ? id : ""} />
        </div>
        <div className="self-start lg:text-2xl">
          <WriteComment portfolio={portfolio} commentType={2} />
          <h1 className="tracking-wide font-bold">{portfolio.title}</h1>
          <h1 className="font-semibold">{portfolio.description}</h1>
          <h1>{portfolio.city}, {portfolio.country}</h1>
          <h1>{portfolio.about}</h1>
        </div>
      </section>
      <CarouselMenu name1={<img src={proyectsIcon} />} name2={<img src={habilitiesIcon} />} name3={<img src={reviewsIcon} />}
        page1={
          <PortfolioProyectPage />
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
