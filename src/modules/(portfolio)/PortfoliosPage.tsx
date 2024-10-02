import { useCallback, useEffect, useState } from "react";
import PictureHandler from '../(picture)/PictureHandler'
import { useNavigate } from "react-router-dom";
import CounterPortfolioAdds from './PortfolioCounterComponent'
import { Portfolio } from './PortfolioInterfaces'
import { getRequest, deleteRequest } from '../../services/RequestService'
import { ClientPortfolioRoutes } from './PortfolioConst'
import PortfolioMenus from './PortfolioMenus'

export default function PortfolioPage() {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [showAnimation, setShowAnimation] = useState(false); // Estado para controlar la animación

  const navigator = useNavigate()

  const getPortfolios = useCallback(async () => {
    const res = await getRequest(ClientPortfolioRoutes.PRIVATE)
    setPortfolios(res)
    setShowAnimation(true); // Iniciar la animación cuando se carguen los portafolios
  }, [])

  useEffect(() => {
    getPortfolios()
  }, [getPortfolios]);

  const handleDelete = async (id: string) => {
    await deleteRequest(ClientPortfolioRoutes.PRIVATE, id)
    getPortfolios()
  };

  return (
    <>

      <PortfolioMenus />

      <div className={`mt-16 flex flex-col w-screen transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>



        <div className='grid grid-cols-1 gap-4'>

          {portfolios.map((portfolio, index) => {

            return (
              <div key={index} className="flex flex-col items-center justify-center border-b border-[#646464] p-4 pb-20 gap-7">




                <section className="flex items-center gap-4 mt-4">

                  <div>
                    <PictureHandler type={1} isViewer={false} isPublic={false} id={portfolio.id} />

                    <section className="flex-col text-sm mt-4">
                      <h3 className="bg-clip-text text-transparent text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 font-semibold">
                        {portfolio.title}
                      </h3>
                      <h3 className="text-xs text-center">{portfolio.description}</h3>
                    </section>

                  </div>


                </section>


                <div className="flex-col flex-wrap flex gap-4">

                 

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

                  <CounterPortfolioAdds portfolioId={portfolio.id} />

                </div>


              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
