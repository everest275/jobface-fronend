import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toolbar from '../../components/Toolbar'
import PortfolioPage from '../../modules/portfolio/PortfoliosPage'
import PortfolioFormPage from '../../modules/portfolio/PortfolioForm'
import PortfolioProyectForm from '../../modules/proyect/portfolios/PortfolioProyectForm'
import PortfolioProyectPage from '../../modules/proyect/portfolios/PortfolioProyectPage'
import PortfolioAbilitieForm from '../../modules/abilitie/portfolios/AbilitieForm'
import PortfolioAbilitiePage from '../../modules/abilitie/portfolios/AbilitiesPage'
import ProtectedRoutes from '../../modules/auth/redirect/AuthRedirect'
import PortfolioReviewPage from '../../modules/review/portfolios/ReviewPage'
import PortfolioReviewForm from '../../modules/review/portfolios/ReviewForm'
import PetitionsReceivedPage from '../../modules/review/petitions/PetitionsReceivedPage'
import ProfilePage from '../../modules/profile/ProfilePage'

export default function PrivateRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path='/portfolios' element={<><Toolbar><PortfolioPage /></Toolbar></>} />
        <Route path='portfolios/:id' element={<><Toolbar><PortfolioFormPage /></Toolbar></>} />
        <Route path='/add-portfolio' element={<><Toolbar> <PortfolioFormPage /></Toolbar></>} />

        <Route path='/add-portfolio-proyect/:portfolio' element={<><Toolbar><PortfolioProyectForm /></Toolbar></>} />
        <Route path='/portfolio-proyect/:id/:portfolio' element={<><Toolbar><PortfolioProyectForm /></Toolbar></>} />
        <Route path='/portfolio-proyects/:id' element={<><Toolbar><PortfolioProyectPage /></Toolbar></>} />

        <Route path='/add-portfolio-abilitie/:portfolio' element={<><Toolbar><PortfolioAbilitieForm /></Toolbar></>} />
        <Route path='/portfolio-abilitie/:id/:portfolio' element={<><Toolbar><PortfolioAbilitieForm /></Toolbar></>} />
        <Route path='/portfolio-abilities/:id' element={<><Toolbar><PortfolioAbilitiePage /></Toolbar></>} />

        <Route path='/add-portfolio-review/:portfolio' element={<><Toolbar><PortfolioReviewForm /></Toolbar></>} />
        <Route path='/portfolio-review/:id/:portfolioId' element={<><Toolbar><PortfolioReviewForm /></Toolbar></>} />
        <Route path='/portfolio-reviews/:id' element={<><Toolbar><PortfolioReviewPage /></Toolbar></>} />
        <Route path='/petitons-received' element={<><Toolbar><PetitionsReceivedPage/></Toolbar></>} />

        <Route path='/profile' element={<><Toolbar><ProfilePage /></Toolbar></>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
