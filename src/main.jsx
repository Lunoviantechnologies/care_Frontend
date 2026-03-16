import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { Provider } from 'react-redux';
import store from "./app/store/store.js";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={AppRoutes} />
  </Provider>
);
