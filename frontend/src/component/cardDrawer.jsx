import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCart(data.cartItems || []); 
          setTotal(data.total || 0);
        }
      })
      .catch(console.error);
  }, []);
    localStorage.setItem("total" , total);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"> Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border rounded p-4 shadow"
            >
              <div>
                <h3 className="font-semibold">{item.product?.name}</h3>
                <p>Price: ₹{item.product?.price}</p>
                <p>Quantity: {item.qty}</p>
              </div>
              <button
                onClick={async () => {
                  await fetch(`http://localhost:3000/cart/${item._id}`, { method: "DELETE" });
                  const updated = cart.filter((c) => c._id !== item._id);
                  setCart(updated);
                }}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right text-lg font-bold">Total: ₹{total}</div>
        </div>
      )}
    </div>
  );
}
