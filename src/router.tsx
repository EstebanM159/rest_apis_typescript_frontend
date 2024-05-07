import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { loader as productsLoader, action as updateAvailabilityAction } from './pages/Products'
import NewProduct, { action as newProductAction } from './pages/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './pages/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'
import Spinner from './components/Spinner'
const Products = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 500)) // 1000ms de retraso
  return import('./pages/Products')
})
const Layout = lazy(async () => await import('./layouts/Layout'))
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<Spinner/>}><Layout/></Suspense>,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Spinner/>}><Products/></Suspense>,
        loader: productsLoader,
        action: updateAvailabilityAction
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct/>,
        action: newProductAction
      },
      {
        path: 'productos/:id/editar',
        element: <EditProduct/>,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path: 'productos/:id/eliminar',
        action: deleteProductAction
      }
    ]
  }
])
