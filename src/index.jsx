import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import OrderDetails from './pages/orderDetails'
import OrderList from './pages/orderList'
import PostProduct from './pages/postProduct'
import Product from './pages/product'
import ProductDetails from './pages/productDetails'

function RouterIndex() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/order/details' element={<OrderDetails />} />
            <Route path='/order' element={<OrderList />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/details' element={<ProductDetails />} />
            <Route path='/product/post' element={<PostProduct />} />
        </Routes>
    )
}

export default RouterIndex