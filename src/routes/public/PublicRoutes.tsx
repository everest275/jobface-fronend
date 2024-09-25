import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toolbar from '../../components/Toolbar'
import HomePage from '../../modules/home/HomePage'
import LoginPage from '../../modules/auth/login/LoginPage'
import RegisterPage from '../../modules/auth/register/RegisterPage'
import BasicPortfolio from '../../modules/template/portfolios&proyects/BasicPortfolio'

export default function PrivateRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<><Toolbar><HomePage /></Toolbar></>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/:id' element={<BasicPortfolio />} />
    </Routes>
  </BrowserRouter>
  )
}
