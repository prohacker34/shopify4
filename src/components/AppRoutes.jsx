import React from 'react'
import { Routes,Route} from 'react-router-dom'
import App from '../App'
import Categories from '../pages/Categories'
import About from '../pages/About'
import AdminProducts from '../pages/AdminProducts'

const AppRoutes = () => {
  return (
    <div>

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/about' element={<About />}/>
          <Route path='/adminproducts' element={<AdminProducts />} />
      </Routes>


    </div>
  )
}

export default AppRoutes