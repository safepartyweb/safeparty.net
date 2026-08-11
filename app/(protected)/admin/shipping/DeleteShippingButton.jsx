"use client";

import { useState } from "react";

export default function DeleteShippingButton({ id, name }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white border border-siteBlack p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-2">
              Delete Shipping Method?
            </h2>

            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">"{name}"</span>? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border border-siteBlack rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <form action="/api/admin/shipping/delete" method="POST">
                <input type="hidden" name="id" value={id} />

                <button
                  type="submit"
                  className="px-4 py-2 border border-red-600 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}