import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { loader as productsLoader, action as updateAvailabilityAction } from './pages/Products'
import { action as newProductAction } from './pages/NewProduct'
import { loader as editProductLoader, action as editProductAction } from './pages/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'
import Spinner from './components/Spinner'
const Layout = lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 600)) // 1000ms de retraso
  return import('./layouts/Layout')
})
const Products = lazy(async () => await import('./pages/Products'))
const NewProduct = lazy(async () => await import('./pages/NewProduct'))
const EditProduct = lazy(async () => await import('./pages/EditProduct'))

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
        element: <Suspense fallback={<Spinner/>}><NewProduct/></Suspense>,
        action: newProductAction
      },
      {
        path: 'productos/:id/editar',
        element: <Suspense fallback={<Spinner/>}><EditProduct/></Suspense>,
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
