import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import ProjectBoard from './pages/ProjectBoard';
import Login from './pages/Login';
import dotenv from 'dotenv';

// Load environment variables from .env.local (if it exists)
dotenv.config({ path: '.env.local' });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/projectboard",
    element: <ProjectBoard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/logmein",
    element: <Login />,
    errorElement: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
