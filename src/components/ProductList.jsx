import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProducts} from '../features/shopCart/productSlice'
import { addToCart } from '../features/shopCart/cartSlice'

const ProductList = () => {
  const {items: products, status} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchProducts())
    }
  }, [status, dispatch])
  if(status === 'loading') return <p>Loading...</p>
  if(status === 'failed') return <p>Failed to load Products, Please try again</p>

  return (
    <>
      <Navbar />
      <div className='product-list'>
        {products.map(product => (
          <div className='product-card' key={product.id}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title.length>20 ? `${product.title.slice(0,20)}...`: `${product.title}`}</h2>
            <p>price : ${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add To cart</button>
          </div>
        )).reverse()}
      </div>
    </>
  )
}

export default ProductList
