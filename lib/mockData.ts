// Mock product data
export const mockProducts = [
  {
    id: 1,
    name: 'Sample Product 1',
    description: 'A great product description',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Sample Product 2',
    description: 'Another amazing product',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
  },
];

// Mock Redux-like hooks
export const useSelector = (selector: Function) => {
  if (selector.toString().includes('products.items')) {
    return mockProducts;
  }
  if (selector.toString().includes('products.isLoading')) {
    return false;
  }
  return null;
};

export const useDispatch = () => {
  return (action: any) => console.log('Dispatched:', action);
};

export const addToCart = (product: any) => ({
  type: 'ADD_TO_CART',
  payload: product,
});
