import { useCallback, useEffect, useState } from "react";
import PictureHandler from '../(picture)/PictureHandler'
import CounterPortfolioAdds from './PortfolioCounterComponent'
import { Portfolio } from './PortfolioInterfaces'
import { useRequestServices } from '../../services/RequestService'
import { ClientPortfolioRoutes } from './PortfolioConst'
import ButtonModel from '../../components/ButtonModel'
import AnimatorContainer from '../../components/AnimatorContainer'
import CardModel from '../../components/CardModel'
import GridContainer from '../../components/GridContainer'

export default function PortfolioPage() {

  const { getRequest, deleteRequest } = useRequestServices();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const getPortfolios = useCallback(async () => {
    const res = await getRequest(ClientPortfolioRoutes.PRIVATE)
    setPortfolios(res)
  }, [getRequest])

  useEffect(() => {
    getPortfolios()
  }, [getPortfolios]);

  const handleDelete = async (id: string) => {
    await deleteRequest(ClientPortfolioRoutes.PRIVATE, id)
    getPortfolios()
  };

  return (
    <AnimatorContainer>
      <GridContainer>

        {portfolios.map((portfolio, index) => {
          return (
            <CardModel key={index}>
              <article>
                <header className="flex items-center flex-wrap gap-4">
                    <PictureHandler type={1} isViewer={false} isPublic={false} id={portfolio.id} />
                    <section className="flex-col text-sm mt-4">
                      <h3 className="bg-clip-text text-transparent text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 font-semibold">
                        {portfolio.title}
                      </h3>
                      <h3 className="text-xs text-center">{portfolio.description}</h3>
                    </section>
                </header>

                <footer className="flex-col flex-wrap flex gap-4 mt-4">
                  <section className="flex gap-2 text-xs">
                    <ButtonModel to={`/portfolios/${portfolio.id}`}>
                      Editar
                    </ButtonModel>
                    <ButtonModel to={`/${portfolio.id}`}>
                      Vista
                    </ButtonModel>
                    <ButtonModel action={() => handleDelete(portfolio.id)}>
                      Eliminar
                    </ButtonModel>
                  </section>
                  <CounterPortfolioAdds portfolioId={portfolio.id} />
                </footer>
              </article>
            </CardModel>
          );
        })}

      </GridContainer>
    </AnimatorContainer>
  );
}
