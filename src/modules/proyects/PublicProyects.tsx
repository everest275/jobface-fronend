import Hero from '../home/Hero'
import BasicTest from '../templates/basic-test/BasicTest';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { usePortfolios } from '../../context/usePortfolios';
import Navbar from '../home/Navbar';


export default function HomePage() {
  const { id } = useParams<{ id: string }>();
  const { publicGetPortfolioById, portfolio } = usePortfolios()

  useEffect(() => {
    publicGetPortfolioById(id ? id : "")
    console.log(id)
  }, [id, publicGetPortfolioById])

  return (
    <section>
      {
        id ? (<BasicTest portfolio={portfolio}/>) : (
          <>
          <Navbar/>
            <Hero />
            
          </>)
      }

    </section>
  )
}
