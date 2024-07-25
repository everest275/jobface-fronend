import { useState } from "react"
import { FC, ReactNode } from 'react'
interface PortfolioProyectProviderProps {
  page1: ReactNode;
  page2: ReactNode;
  page3: ReactNode;
  name1: ReactNode;
  name2: ReactNode;
  name3: ReactNode;

}

const CarouselMenu: FC<PortfolioProyectProviderProps> = ({ page1, page2, page3, name1, name2, name3 }) => {
  const [pageOne, setPageOne] = useState<string>("")
  const [pageTwo, setPageTwo] = useState<string>("hidden")
  const [pageThree, setPageThree] = useState<string>("hidden")


  const handleChangePage = (page: number) => {

    if (page === 2) {
      setPageTwo("visible")
      setPageOne("hidden")
      setPageThree("hidden")
    }

    if (page === 3) {
      setPageThree("visible")
      setPageOne("hidden")
      setPageTwo("hidden")
    }

    if (page === 1) {
      setPageOne("visible")
      setPageTwo("hidden")
      setPageThree("hidden")
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-full mt-9 gap-2">
      <section className="flex flex-col">

        <div className="border border-gray-300 py-3 flex gap-1 shadow-xl rounded-md">
          <div className="group relative px-4 cursor-pointer">
            <button onClick={() => handleChangePage(1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
              {name1}
            </button>
            <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-zinc-800 px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
              proyectos
            </span>
          </div>
          <div className="group relative px-4 cursor-pointer">
            <button onClick={() => handleChangePage(2)} className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
              {name2}
            </button>
            <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-zinc-800 px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
              abilities
            </span>
          </div>
          <div className="group relative px-4 cursor-pointer">
            <button onClick={() => handleChangePage(3)} className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
              {name3}
            </button>
            <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-zinc-800 px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
              reviews
            </span>
          </div>
        </div>
      </section>


      <main className="w-full">
        <section className={`w-full flex flex-col items-center h-full ${pageOne}`}>
          {page1}
        </section>

        <section className={` w-full flex flex-col items-center h-full ${pageTwo}`}>
          {page2}
        </section>

        <section className={` w-full flex flex-col items-center h-full ${pageThree}`}>
          {page3}
        </section>

      </main>
    </div>
  )
}
export default CarouselMenu
