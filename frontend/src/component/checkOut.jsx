import React, { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Example: Fetch order details from localStorage or backend
    const order = JSON.parse(localStorage.getItem("orderDetails"));
    if (order) {
      setOrderDetails(order);
      
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-600 text-lg">No recent orders found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex justify-center items-center gap-2">
           Order Placed!
        </h2>

        <div className="text-left space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {orderDetails.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {orderDetails.email}
          </p>
          <p>
            <span className="font-semibold">Total:</span> ₹{orderDetails.total}
          </p>
          <p>
            <span className="font-semibold">Time:</span>{" "}
            {new Date(orderDetails.time).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
