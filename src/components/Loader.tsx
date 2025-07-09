const Loader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-gray-200 rounded h-24 w-full"></div>
      ))}
    </div>
  )
}

export default Loader
