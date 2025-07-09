import { useState } from 'react'
import { useBlog } from '../context/BlogContext'
import { Link } from 'react-router-dom'
import NoData from '../components/NoData'
import { FaSearch, FaArrowRight, FaArrowLeft, FaUser } from 'react-icons/fa'
import { motion } from 'framer-motion'
import SkeletonCard from '../components/SkeletonCard'

const POSTS_PER_PAGE = 5

const Home = () => {
  const { posts, users, loading } = useBlog()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
    const matchesAuthor = selectedAuthor
      ? post.userId === parseInt(selectedAuthor)
      : true
    return matchesSearch && matchesAuthor
  })

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const getAuthorName = (userId: number) =>
    users.find((u) => u.id === userId)?.name || 'Unknown'

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleSearch = () => {
    setSearch(searchInput)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearch('')
    setSearchInput('')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search bar */}
        <div className="flex w-full sm:w-2/3 shadow-sm">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-r-0 rounded-l-md focus:outline-none"
            />
          </div>
          {search ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
            >
              Reset
            </button>
          ) : (
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Search
            </button>
          )}
        </div>

        {/* Author filter */}
        <select
          value={selectedAuthor}
          onChange={(e) => {
            setSelectedAuthor(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-md"
        >
          <option value="">All Authors</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loader or Posts */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col md:flex-row gap-4 border rounded-xl shadow-lg hover:shadow-xl transition p-6 bg-indigo-50"
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold capitalize mb-2 text-indigo-800">
                    {post.title}
                  </h2>

                  <p className="text-gray-700 text-sm mb-4">
                    {post.body.slice(0, 120)}...
                  </p>

                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                    <FaUser className="text-indigo-500" />
                    <span className="font-medium text-indigo-700">Author:</span>{' '}
                    <Link
                      to={`/users/${post.userId}`}
                      className="text-blue-700 underline hover:text-blue-900"
                    >
                      {getAuthorName(post.userId)}
                    </Link>
                  </p>

                  <Link
                    to={`/posts/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full"
                  >
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <NoData />
          )}

          {/* Pagination Controls */}
          {filteredPosts.length > POSTS_PER_PAGE && (
            <div className="flex justify-center items-center gap-4 mt-6">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded transition font-medium ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <FaArrowLeft /> Previous
              </button>

              {/* Page Info */}
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded transition font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
