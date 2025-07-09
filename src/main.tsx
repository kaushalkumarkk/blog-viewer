import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext.tsx'

createRoot(document.getElementById('root')!).render(
    <BlogProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </BlogProvider>
)
