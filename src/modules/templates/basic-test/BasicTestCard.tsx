import {FC,ReactNode} from 'react'
interface PortfolioProyectProviderProps {
  children: ReactNode;
}

const BasicTestCard: FC<PortfolioProyectProviderProps> = ({ children }) => {


  return (
    <>

        <div className="relative w-full mb-24">
          {children}
        </div>
    </>
  );
};

export default BasicTestCard;
