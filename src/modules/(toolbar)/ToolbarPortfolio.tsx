import { ReactNode } from "react";
import { useNavigate } from "react-router-dom"

interface ToolbarPortfolioProps {
  children: ReactNode;
}

const ToolbarPortfolio: React.FC<ToolbarPortfolioProps> = ({ children }) => {

  const navigator = useNavigate()

  return (<>
    <div className="fixed z-50 bg-black rounded-xl rounded-r-none w-[100%] xl:w-[70%] -mt-1 md:mt-0">
        <div className="p-3 flex gap-4">
        <button
            onClick={() => navigator(`/portfolios`)}
            className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center text-sm shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-24"
          >
            Ver
          </button>

          <button
            onClick={() => navigator(`/add-portfolio`)}
            className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center text-sm shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-24"
          >
            Crear
          </button>

          <button
            onClick={() => navigator(`/portfolio-petitions`)}
            className="tracking-wide py-1 px-2 bg-zinc-800 transition ease-in duration-200 text-center text-sm shadow-md hover:bg-[#646464] rounded-md flex gap-2 justify-center items-center content-center h-9 w-24"
          >
            Peticiones
          </button>
          
        </div>
      </div>
      {children}
      </> 
  )
}
export default ToolbarPortfolio
