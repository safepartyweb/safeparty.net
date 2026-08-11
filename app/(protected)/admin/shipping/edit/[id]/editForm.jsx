"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function EditForm({ method }) {
  const [form, setForm] = useState({
    name: method.name || "",
    shortNote: method.shortNote || "",
    price: method.price || 0,
    deliveryTime: method.deliveryTime || "",
    isActive: method.isActive,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", form)

    const res = await fetch(`/api/admin/shipping/edit/${method._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    console.log("Res", await res.json())

    if (res.ok) {
      toast.success("Updated successfully!");
      window.location.href = "/admin/shipping";
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="shortNote"
        value={form.shortNote}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="deliveryTime"
        value={form.deliveryTime}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      <button className="bg-black text-white px-4 py-2 cursor-pointer">
        Update
      </button>
    </form>
  );
}