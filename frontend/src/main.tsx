import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth } from './pages/auth/page.tsx'
import { Tarefas } from './pages/tasks/page.tsx'

const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    { path: '/', element: <Auth />},
    { path: '/tarefas', element: <Tarefas />}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={pages} />
  </StrictMode>,
)
