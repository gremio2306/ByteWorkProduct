import React from "react";

const CartCtx = React.createContext(null);

export function CartProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  const addItem = (product) => {
    if (!product) return;

    setItems((prev) => {
      const exist = prev.find((x) => x.id === product.id);
      const stock = product.stock ?? null;

      if (exist) {
        const nextQty = exist.qty + 1;
        if (stock != null && nextQty > stock) return prev;
        return prev.map((x) => (x.id === product.id ? { ...x, qty: nextQty } : x));
      }
      if (stock != null && stock <= 0) return prev;

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock ?? null,
          image: product.image,
          qty: 1,
        },
      ];
    });

    setOpen(true);
  };

  const inc = (id) => {
    setItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        if (x.stock != null && x.qty >= x.stock) return x;
        return { ...x, qty: x.qty + 1 };
      })
    );
  };

  const dec = (id) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const count = items.reduce((acc, it) => acc + it.qty, 0);

  const value = {
    open,
    openCart,
    closeCart,
    items,
    subtotal,
    count,
    addItem,
    inc,
    dec,
    removeItem,
    clearCart,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
