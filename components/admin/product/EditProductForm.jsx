'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-black text-white disabled:opacity-50"
    >
      {pending ? 'Updating...' : 'Update Product'}
    </button>
  );
}

export default function EditProductForm({ product, action }) {
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="productId" defaultValue={product._id.toString()} />
      <input type="text" name="title" defaultValue={product.title} />
      <input type="number" name="price" defaultValue={product.price} />
      <textarea name="description" defaultValue={product.description} />
      <input type="hidden" name="images" defaultValue={JSON.stringify(product.images || [])} />
      <input type="hidden" name="variations" defaultValue={JSON.stringify(product.variations || [])} />
      <SubmitButton />
    </form>
  );
}