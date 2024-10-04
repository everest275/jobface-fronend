import { Route, Routes } from "react-router-dom";
import ProfilePage from "../modules/(profile)/ProfilePage";
import Toolbar from '../modules/(toolbar)/Toolbar'
import HomePage from "../modules/(home)/HomePage";
import LoginPage from "../modules/(auth)/LoginPage";
import RegisterPage from "../modules/(auth)/RegisterPage";
import Basic from '../modules/(template)/Basic'
import Private from "./Private";
import PortfolioPage from "../modules/(portfolio)/PortfoliosPage";
import PortfolioForm from "../modules/(portfolio)/PortfolioForm";
import PortfolioProyectForm from "../modules/(proyect)/PortfolioProyectForm";
import PortfolioProyectPage from "../modules/(proyect)/PortfolioProyectPage";
import PortfolioAbilitieForm from "../modules/(abilitie)/PortfolioAbilitieForm";
import PortfolioAbilitiePage from "../modules/(abilitie)/PortfolioAbilitiePage";
import PortfolioReviewPage from "../modules/(review)/PortfolioReviewPage";
import PetitionsReceivedPage from "../modules/(review)/PortfolioPetitionsPage";
import ToolbarPortfolio from '../modules/(toolbar)/ToolbarPortfolio'

export default function AuthfaceRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route path='/' element={<><Toolbar><HomePage /></Toolbar></>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/:id' element={<Basic />} />

      <Route element={<Private />}>
        {/* Private */}

        <Route path='/portfolios' element={<Toolbar><ToolbarPortfolio><PortfolioPage /></ToolbarPortfolio></Toolbar>} />
        <Route path='portfolios/:id' element={<Toolbar><ToolbarPortfolio><PortfolioForm /></ToolbarPortfolio></Toolbar>} />
        <Route path='/add-portfolio' element={<Toolbar> <ToolbarPortfolio><PortfolioForm /></ToolbarPortfolio></Toolbar>} />

        <Route path='/add-portfolio-proyect/:portfolio' element={<Toolbar><ToolbarPortfolio><PortfolioProyectForm /></ToolbarPortfolio></Toolbar>} />
        <Route path='/portfolio-proyect/:id/:portfolio' element={<Toolbar><ToolbarPortfolio><PortfolioProyectForm /></ToolbarPortfolio></Toolbar>} />
        <Route path='/portfolio-proyects/:id' element={<Toolbar><ToolbarPortfolio><PortfolioProyectPage /></ToolbarPortfolio></Toolbar>} />

        <Route path='/add-portfolio-abilitie/:portfolio' element={<Toolbar><ToolbarPortfolio><PortfolioAbilitieForm /></ToolbarPortfolio></Toolbar>} />
        <Route path='/portfolio-abilitie/:id/:portfolio' element={<Toolbar><ToolbarPortfolio><PortfolioAbilitieForm /></ToolbarPortfolio></Toolbar>} />
        <Route path='/portfolio-abilities/:id' element={<Toolbar><ToolbarPortfolio><PortfolioAbilitiePage /></ToolbarPortfolio></Toolbar>} />

        <Route path='/portfolio-reviews/:id' element={<Toolbar><ToolbarPortfolio><PortfolioReviewPage /></ToolbarPortfolio></Toolbar>} />
        <Route path='/portfolio-petitions' element={<Toolbar><ToolbarPortfolio><PetitionsReceivedPage /></ToolbarPortfolio></Toolbar>} />

        <Route path='/profile' element={<><Toolbar><ProfilePage /></Toolbar></>} />
      </Route>
    </Routes>
  )
}
