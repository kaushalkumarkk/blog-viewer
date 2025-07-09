const SkeletonCard = () => {
  return (
    <div className="animate-pulse border rounded-lg p-4 bg-white shadow">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-8 bg-gray-300 rounded w-24" />
    </div>
  )
}

export default SkeletonCard
