const CardAnggota = ({ nama, jabatan, foto, bidang }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md transition">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 border-2 border-blue-100">
        <img 
          src={foto || "https://via.placeholder.com/150"} 
          alt={nama} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-gray-800">{nama}</h3>
      <p className="text-blue-600 text-sm font-medium uppercase tracking-wider">{jabatan}</p>
      {bidang && (
        <span className="mt-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
          {bidang}
        </span>
      )}
    </div>
  );
};

export default CardAnggota;