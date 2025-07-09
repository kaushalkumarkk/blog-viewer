import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import AuthorDetail from './pages/AuthorDetail'

function App() {

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Viewer</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/users/:id" element={<AuthorDetail />} />
      </Routes>
    </div>
    </>
  )
}

export default App
