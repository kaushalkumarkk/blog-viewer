import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import type { Comment, Post, User } from '../types/types'
import Loader from '../components/Loader'
import { FaArrowLeft, FaUser, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [author, setAuthor] = useState<User | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const postData = postRes.data
        setPost(postData)

        const [userRes, commentsRes, userPostsRes] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
          axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`),
          axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${postData.userId}`)
        ])

        setAuthor(userRes.data)
        setComments(commentsRes.data)
        setRelatedPosts(userPostsRes.data.filter((p: Post) => p.id !== postData.id))
      } catch (err) {
        console.error('Error fetching post details', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPostDetails()
  }, [id])

  if (loading) return <Loader />
  if (!post) return <p className="text-center text-red-600">Post not found</p>

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        <FaArrowLeft /> Back
      </Link>

      {/* Post Card */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl shadow-lg p-6 space-y-5">
        <h2 className="text-3xl font-bold capitalize text-indigo-800">{post.title}</h2>
        <p className="text-gray-800 leading-relaxed text-base">{post.body}</p>

        {author && (
          <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-200 space-y-2">
            <p className="flex items-center gap-2 text-sm text-gray-700">
              <FaUser className="text-blue-500" />
              <span className="font-medium">Author:</span>
              <Link
                to={`/users/${author.id}`}
                className="text-blue-700 underline hover:text-blue-900"
              >
                {author.name}
              </Link>
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-700">
              <FaEnvelope className="text-blue-500" />
              <span className="font-medium">Email:</span>
              {author.email}
            </p>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.1, delay: comment.id * 0 }}
            className="bg-pink-50 border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <p className="font-semibold text-indigo-700 mb-1">
              {comment.name} <span className="text-gray-500">({comment.email})</span>
            </p>
            <p className="text-gray-700 text-sm">{comment.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Related Posts by {author?.name}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.slice(0, 3).map((rp) => (
              <Link
                key={rp.id}
                to={`/posts/${rp.id}`}
                className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow hover:shadow-md hover:bg-indigo-50 transition flex flex-col justify-between min-h-[180px]"
              >
                <h4 className="text-lg font-semibold capitalize text-indigo-800 mb-2">
                  {rp.title}
                </h4>
                <p className="text-sm text-gray-600">{rp.body.slice(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetail
