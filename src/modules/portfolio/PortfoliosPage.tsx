import { useEffect } from "react";
import { usePortfolios } from '../../hook/usePortfolios';
import PictureHandler from '../picture/PictureHandler'
import { useNavigate } from "react-router-dom";
import CounterPortfolioAdds from '../../components/CounterPortfolioAdds'

export default function PortfolioPage() {
  const { getPortfolios, portfolios, deletePortfolio, setPortfolios } = usePortfolios();


  const navigator = useNavigate()

  useEffect(() => {
    setPortfolios([])
    getPortfolios();

  }, [setPortfolios, getPortfolios]);

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

          return (
            <div key={index} className="flex flex-col items-start p-6 border-b border-[#646464]">

              <section className="flex items-end gap-6 sm:gap-20">

                <PictureHandler type={1} isViewer={false} isPublic={false} id={portfolio.id} />

                <section className="flex flex-col gap-10 self-end">

                 <CounterPortfolioAdds portfolioId={portfolio.id} />

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
