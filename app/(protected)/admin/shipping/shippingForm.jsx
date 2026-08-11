"use client";

import { useState } from "react";

export default function ShippingForm() {
  const [form, setForm] = useState({
    name: "",
    shortNote: "",
    price: "",
    deliveryTime: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to create shipping method");
      }

      setForm({
        name: "",
        shortNote: "",
        price: "",
        deliveryTime: "",
      });

      window.location.reload();
    } catch (err) {
      console.error("error:",err);
      alert("Error creating shipping method");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />


      <input
        name="shortNote"
        placeholder="Short Note"
        value={form.shortNote}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <input
        name="deliveryTime"
        placeholder="Delivery Time (e.g. 3-5 days)"
        value={form.deliveryTime}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <button
        disabled={loading}
        className="bg-siteBlack text-white px-4 py-2 rounded cursor-pointer"
      >
        {loading ? "Creating..." : "Add Method"}
      </button>
    </form>
  );
}