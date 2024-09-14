import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './modules/auth/login/LoginPage'
import RegisterPage from '../src/modules/auth/register/RegisterPage'
import { AuthProvider } from './modules/auth/AuthContext'
import {PortfolioReviewProvider} from './modules/review/portfolios&proyects/ReviewContext'
import PortfolioFormPage from './modules/portfolio/PortfolioForm'
import ProfilePage from './modules/profile/ProfilePage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Navbar from './components/XLNavbar'
import { PortfolioProvider } from './modules/portfolio/PortfolioContext'
import { PortfolioProyectProvider } from './modules/proyect/portfolios/PortfolioProyectContext'
import { PortfolioAbilitieProvider } from './modules/abilitie/portfolios&proyects/AbilitieContext'
import PortfolioProyectForm from './modules/proyect/portfolios/PortfolioProyectForm'
import { PortfolioPictureProvider } from './modules/picture/portfolios&proyects/PictureContext'
import PortfolioProyectPage from './modules/proyect/portfolios/PortfolioProyectPage'
import HomePage from './modules/home/HomePage'
import PortfolioPage from './modules/portfolio/PortfoliosPage'
import PortfolioAbilitieForm from './modules/abilitie/portfolios&proyects/AbilitieForm'
import PortfolioAbilitiePage from './modules/abilitie/portfolios&proyects/AbilitiesPage'
import PortfolioReviewPage from './modules/review/portfolios&proyects/ReviewPage'
import PortfolioReviewForm from './modules/review/portfolios&proyects/ReviewForm'
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

                  <Route path='/' element={<><Navbar><HomePage /></Navbar></>} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/:id' element={<BasicPortfolio />} />

                  <Route element={<ProtectedRoutes />}>
                    {/* Private */}

                    <Route path='/portfolios' element={<><Navbar><PortfolioPage /></Navbar></>} />
                    <Route path='portfolios/:id' element={<><Navbar><PortfolioFormPage /></Navbar></>} />
                    <Route path='/add-portfolio' element={<><Navbar> <PortfolioFormPage /></Navbar></>} />

                    <Route path='/add-portfolio-proyect/:portfolio' element={<><Navbar><PortfolioProyectForm /></Navbar></>} />
                    <Route path='/portfolio-proyect/:id/:portfolio' element={<><Navbar><PortfolioProyectForm /></Navbar></>} />
                    <Route path='/portfolio-proyects/:id' element={<><Navbar><PortfolioProyectPage /></Navbar></>} />

                    <Route path='/add-portfolio-abilitie/:portfolio' element={<><Navbar><PortfolioAbilitieForm /></Navbar></>} />
                    <Route path='/portfolio-abilitie/:id/:portfolio' element={<><Navbar><PortfolioAbilitieForm /></Navbar></>} />
                    <Route path='/portfolio-abilities/:id' element={<><Navbar><PortfolioAbilitiePage /></Navbar></>} />

                    <Route path='/add-portfolio-review/:portfolio' element={<><Navbar><PortfolioReviewForm /></Navbar></>} />
                    <Route path='/portfolio-review/:id/:portfolioId' element={<><Navbar><PortfolioReviewForm /></Navbar></>} />
                    <Route path='/portfolio-reviews/:id' element={<><Navbar><PortfolioReviewPage /></Navbar></>} />
                    <Route path='/petitons-received' element={<><Navbar><PetitionsReceivedPage/></Navbar></>} />

                    <Route path='/profile' element={<><Navbar><ProfilePage /></Navbar></>} />
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
