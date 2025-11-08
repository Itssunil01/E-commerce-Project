export default function ProductList({ products = [], addToCart }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id || p.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
            >
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
                className="h-40 w-full object-contain mb-4"
              />
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-gray-600 mb-2">₹{p.price}</p>
              <button
                onClick={() => addToCart(p._id || p.id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
