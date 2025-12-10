import React from 'react'
import { Routes,Route} from 'react-router-dom'
import App from '../App'
import Categories from '../pages/Categories'

const AppRoutes = () => {
  return (
    <div>

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/categories' element={<Categories />} />
      </Routes>


    </div>
  )
}

export default AppRoutes