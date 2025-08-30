import CardComponent from './CardComponent';

type Product = {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
};

export default function ListGridComponent({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <CardComponent key={p.id} product={p} />
      ))}
    </div>
  );
}
