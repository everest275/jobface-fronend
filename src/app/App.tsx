import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthfaceContext'
import React, { Suspense } from 'react'
const AuthfaceRoutes = React.lazy(() => import('../routes/AuthfaceRoutes'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <BrowserRouter>
          <AuthfaceRoutes />
        </BrowserRouter>
      </AuthProvider>
    </Suspense>
  )
}

export default App
