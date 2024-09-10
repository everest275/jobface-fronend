import {FC,ReactNode} from 'react'
interface PortfolioProyectProviderProps {
  children: ReactNode;
}

const BasicPortfolioCard: FC<PortfolioProyectProviderProps> = ({ children }) => {


  return (
    <>

        <div className="relative w-full mb-24">
          {children}
        </div>
    </>
  );
};

export default BasicPortfolioCard;
