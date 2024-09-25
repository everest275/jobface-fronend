import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './modules/auth/login/LoginPage'
import RegisterPage from '../src/modules/auth/register/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import {PortfolioReviewProvider} from './context/ReviewContext'
import PortfolioFormPage from './modules/portfolio/PortfolioForm'
import ProfilePage from './modules/profile/ProfilePage'
import ProtectedRoutes from './modules/auth/redirect/AuthRedirect'
import Toolbar from './components/Toolbar'
import { PortfolioProvider } from './context/PortfolioContext'
import { PortfolioProyectProvider } from './context/PortfolioProyectContext'
import { PortfolioAbilitieProvider } from './context/AbilitieContext'
import PortfolioProyectForm from './modules/proyect/portfolios/PortfolioProyectForm'
import { PortfolioPictureProvider } from './context/PictureContext'
import PortfolioProyectPage from './modules/proyect/portfolios/PortfolioProyectPage'
import HomePage from './modules/home/HomePage'
import PortfolioPage from './modules/portfolio/PortfoliosPage'
import PortfolioAbilitieForm from './modules/abilitie/portfolios/AbilitieForm'
import PortfolioAbilitiePage from './modules/abilitie/portfolios/AbilitiesPage'
import PortfolioReviewPage from './modules/review/portfolios/ReviewPage'
import PortfolioReviewForm from './modules/review/portfolios/ReviewForm'
import BasicPortfolio from './modules/template/portfolios&proyects/BasicPortfolio'
import PetitionsReceivedPage from './modules/review/petitions/PetitionsReceivedPage'

function App() {

  return (
    <AuthProvider>
      <PortfolioProvider>
        <PortfolioProyectProvider>
          <PortfolioPictureProvider>
            <PortfolioAbilitieProvider>
              <PortfolioReviewProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public */}

                  <Route path='/' element={<><Toolbar><HomePage /></Toolbar></>} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/:id' element={<BasicPortfolio />} />

                  <Route element={<ProtectedRoutes />}>
                    {/* Private */}

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
              </PortfolioReviewProvider>
            </PortfolioAbilitieProvider>
          </PortfolioPictureProvider>
        </PortfolioProyectProvider>
      </PortfolioProvider>
    </AuthProvider>
  )
}

export default App
