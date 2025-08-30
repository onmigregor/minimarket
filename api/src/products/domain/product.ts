export interface RatingRaw {
  rate: number;
  count: number;
}

// Raw product shape as stored in products.json
export interface ProductRaw {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  // Availability flag provided in dataset
  isAvailable?: boolean;
  rating?: RatingRaw;
}

// Public Product DTO returned by API
export interface ProductDTO {
  id: string; // e.g. "p1"
  name: string; // from title
  price: number;
  isAvailable: boolean;
  category: string; // normalized slug
  image: string;
}
