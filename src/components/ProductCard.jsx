import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const price = Number(product.price || 0);
  const originalPrice = Number(product.original_price || 0);
  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:border-black transition-all duration-300">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img
            src={
              product.images?.[0] ||
              `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(
                product.name
              )}`
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded text-xs font-semibold">
              -{discount}%
            </div>
          )}
          {product.qty === 0 && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-sm font-semibold text-black">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* ✅ Clickable category name (goes to Products page filtered by category) */}
          {product.category && (
            <Link
              to={`/products?category=${product.category.toLowerCase()}`}
              className="text-xs text-black mb-1 hover:underline"
              onClick={(e) => e.stopPropagation()} // prevents opening product detail
            >
              {product.category}
            </Link>
          )}

          <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-black transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            {product.rating && <span className="text-sm text-black">⭐{product.rating}</span>}
            {product.reviews && (
              <span className="text-xs text-black">({product.reviews})</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-black">${price.toFixed(2)}</span>
            {originalPrice > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
