import { Routes, Route } from 'react-router';
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css';

function App() {

  return (
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
  )
}

export default App
