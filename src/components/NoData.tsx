import NoDataImg from '../assets/nodata.jpg'

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center rounded-lg  space-y-4">
      {/* Image */}
      <img
        src={NoDataImg}
        alt="No Data"
        className="w-80 h-80 object-contain opacity-100"
      />

      {/* Title */}
      <h2 className="text-2xl font-semibold text-blue-700">No Data Found</h2>

    </div>
  )
}

export default NoData
