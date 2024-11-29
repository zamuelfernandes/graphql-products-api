const _products = [
  { id: "0", name: "Product A", price: 100, stock: 50 },
  { id: "1", name: "Product B", price: 200, stock: 40 },
  { id: "2", name: "Product C", price: 300, stock: 30 },
  { id: "3", name: "Product D", price: 400, stock: 30 },
  { id: "4", name: "Product E", price: 500, stock: 10 },
];
export const getProducts = () => _products;

export const getProductById = (id: string) => _products.find((p) => p.id === id);

export const deleteProductById = (id: string) => {
  const index = _products.findIndex((p) => p.id === id);
  if (index > -1) {
    return _products.splice(index, 1)[0];
  }
  return null;
};

export const updateProductById = (id: string, updates: Partial<{ name: string; price: number; stock: number }>) => {
  const product = _products.find((p) => p.id === id);
  if (!product) return null;

  if (updates.name !== undefined) product.name = updates.name;
  if (updates.price !== undefined) product.price = updates.price;
  if (updates.stock !== undefined) product.stock = updates.stock;

  return product;
};
