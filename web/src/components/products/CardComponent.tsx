import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
};

export default function CardComponent({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-xl min-w-[250px]">
        <img src={product.image} alt={product.name} className="w-[200px] h-[200px] object-cover rounded-lg mb-4 border border-gray-100" />
        <div className="min-h-[75px] w-full flex items-center justify-center">
          <span className="text-base font-semibold mb-2 text-center text-gray-900">{product.name}</span>
        </div>
        <span className="text-sm text-blue-700 font-bold mb-2">${product.price}</span>
        <span className={`px-3 py-1 text-xs rounded-full font-semibold mb-2 ${product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{product.isAvailable ? 'En stock' : 'Sin stock'}</span>
      </div>
    </Link>
  );
}
