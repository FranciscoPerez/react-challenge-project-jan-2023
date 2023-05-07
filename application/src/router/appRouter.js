import React from 'react';
import { Main, Login, OrderForm, ViewOrders} from '../components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: '/', element: <Main/>},
  {path: '/login', element: <Login/>},
  {path: '/order', element: <OrderForm/>},
  {path: '/view-orders', element: <ViewOrders/>},
])

const AppRouter = (props) => {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;
