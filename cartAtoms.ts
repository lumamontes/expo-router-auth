import { atom } from 'jotai';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const cartItemsAtom = atom<CartItem[]>([]);

export const addToCartAtom = atom(
  (get) => get(cartItemsAtom),
  (get, set, product: Product) => {
    const currentCart = get(cartItemsAtom);
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // If item exists, update quantity
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1
      };
      set(cartItemsAtom, updatedCart);
    } else {
      // If item doesn't exist, add it with quantity 1
      set(cartItemsAtom, [...currentCart, { ...product, quantity: 1 }]);
    }
  }
);

export const removeFromCartAtom = atom(
  (get) => get(cartItemsAtom),
  (get, set, productId: string) => {
    const currentCart = get(cartItemsAtom);
    set(cartItemsAtom, currentCart.filter(item => item.id !== productId));
  }
);

export const updateQuantityAtom = atom(
  (get) => get(cartItemsAtom),
  (get, set, params: { productId: string; newQuantity: number }) => {
    const { productId, newQuantity } = params;
    const currentCart = get(cartItemsAtom);
    
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      set(cartItemsAtom, currentCart.filter(item => item.id !== productId));
      return;
    }
    
    set(cartItemsAtom, currentCart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  }
);

export const clearCartAtom = atom(
  (get) => get(cartItemsAtom),
  (_, set) => set(cartItemsAtom, [])
);

export const cartTotalAtom = atom((get) => {
  const cart = get(cartItemsAtom);
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

export const cartItemCountAtom = atom((get) => {
  const cart = get(cartItemsAtom);
  return cart.reduce((count, item) => count + item.quantity, 0);
});