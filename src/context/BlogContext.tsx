import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import type { Post, User } from '../types/types'

interface BlogContextType {
  posts: Post[]
  users: User[]
  loading: boolean
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/users'),
        ])
        setPosts(postsRes.data)
        setUsers(usersRes.data)
      } catch (error) {
        console.error('Error fetching data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <BlogContext.Provider value={{ posts, users, loading }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) throw new Error('useBlog must be used inside BlogProvider')
  return context
}
