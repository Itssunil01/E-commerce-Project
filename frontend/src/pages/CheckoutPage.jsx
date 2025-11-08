import React, { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState("");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(data.cartItems);
          setTotal(data.total);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        customer: { name: form.name, email: form.email },
      }),
    });

    const data = await response.json();
    if (data.success) {
      setReceipt(data.receipt);
    } else {
      alert("Checkout failed");
    }
  };

  if (receipt) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-3 text-green-600"> Order Placed!</h2>
        <p className="text-gray-700">Name: {form.name}</p>
        <p className="text-gray-700">Email: {form.email}</p>
        <p className="font-semibold mt-2">Total: ₹{receipt.total}</p>
        <p className="text-gray-500 text-sm mt-1">
          Time: {new Date(receipt.timestamp).toLocaleString()}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>

      <input
        type="text"
        placeholder="Your Name"
        className="border w-full p-2 mb-3 rounded-md"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        className="border w-full p-2 mb-3 rounded-md"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <div className="border w-full p-2 mb-3 rounded-md bg-gray-100">
        <strong>Total:</strong> ₹{total}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
      >
        Place Order
      </button>
    </form>
  );
}
