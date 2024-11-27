export const products = [
  { id: "0", name: "Product A", price: 100, stock: 50 },
  { id: "1", name: "Product B", price: 200, stock: 40 },
  { id: "2", name: "Product C", price: 300, stock: 30 },
  { id: "3", name: "Product D", price: 400, stock: 30 },
  { id: "4", name: "Product E", price: 500, stock: 10 },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

// export const getProducts = () => products;

export const deleteProductById = (id: string) => {
  const index = products.findIndex((p) => p.id === id);
  if (index > -1) {
    return products.splice(index, 1)[0];
  }
  return null;
};
