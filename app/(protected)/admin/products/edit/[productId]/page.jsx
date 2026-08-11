// app/(protected)/admin/products/edit/[productId]/page.jsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductEdit from '@/components/admin/product/ProductEdit';
import connectMongo from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';

async function getProduct(productId) {
  await connectMongo();

  const product = await Product.findById(productId).lean();
  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
}

async function getCategories() {
  await connectMongo();

  const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

const Page = async ({ params }) => {
  const { productId } = await params;

  const [product, categories] = await Promise.all([
    getProduct(productId),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Product: {product.title}</h2>
        <Link
          className="bg-black text-white px-4 py-2 rounded border hover:bg-white hover:text-black cursor-pointer"
          target="_blank"
          href={`/products/${product.slug}`}
        >
          View Product
        </Link>
      </div>

      <ProductEdit product={product} categories={categories} />
    </div>
  );
};

export default Page