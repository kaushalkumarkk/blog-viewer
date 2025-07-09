import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import type { Post, User } from '../types/types'
import Loader from '../components/Loader'
import {
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaBuilding,
  FaMapMarkerAlt,
  FaNewspaper
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const AuthorDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
        ])
        setUser(userRes.data)
        setUserPosts(postsRes.data)
      } catch (error) {
        console.error('Error fetching author details', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthor()
  }, [id])

  if (loading) return <Loader />
  if (!user) return <p className="text-center">Author not found.</p>

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        <FaArrowLeft /> Back to Posts
      </Link>

      {/* Author Info */}
      <div className="border rounded-2xl shadow-lg p-6 bg-white space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUser className="text-blue-500" /> {user.name}
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" /> {user.email}
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-gray-500" /> {user.phone}
          </p>
          <p className="flex items-center gap-2">
            <FaGlobe className="text-gray-500" /> {user.website}
          </p>
          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-gray-500 mt-0.5" />
            {user.address.street}, {user.address.suite}, {user.address.city}
          </p>
          <p className="flex items-center gap-2 col-span-2">
            <FaBuilding className="text-gray-500" /> {user.company.name}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full mt-3">
          <FaNewspaper className="text-blue-500" />
          {userPosts.length} posts published
        </div>
      </div>

      {/* Author Posts */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Other Posts by {user.name}
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {userPosts.map((post, index) => (
            <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border rounded-xl p-5 shadow bg-indigo-50 hover:shadow-md transition flex flex-col justify-between min-h-[220px]" // 👈 key part
            >
            <div className="space-y-2">
                <h4 className="text-lg font-semibold capitalize text-blue-800">
                {post.title}
                </h4>
                <p className="text-sm text-gray-700">{post.body.slice(0, 100)}...</p>
            </div>

            <Link
                to={`/posts/${post.id}`}
                className="inline-flex items-center gap-1 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 mt-4 rounded-full self-start"
            >
                Read More <FaArrowRight />
            </Link>
            </motion.div>

          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthorDetail
