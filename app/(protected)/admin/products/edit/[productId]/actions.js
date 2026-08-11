'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import connectMongo from '@/lib/db';
import Product from '@/models/Product';



function parseBoolean(value) {
  return value === 'true' || value === 'on';
}

function parseNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function parseJSON(value, fallback) {
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export async function updateProductAction(formData) {
  await connectMongo();

  try {
    const productId = formData.get('productId')?.toString();

    if (!productId) {
      return {
        ok: false,
        message: 'Product ID is required',
      };
    }

    const product = await Product.findById(productId);

    if (!product) {
      return {
        ok: false,
        message: 'Product not found',
      };
    }

    const title = formData.get('title')?.toString().trim() || '';
    const description = formData.get('description')?.toString().trim() || '';
    const category = formData.get('category')?.toString() || '';
    const unit = formData.get('unit')?.toString().trim() || '';

    const bestSeller = parseBoolean(formData.get('bestSeller')?.toString());
    const showHero = parseBoolean(formData.get('showHero')?.toString());
    const isFeatured = parseBoolean(formData.get('isFeatured')?.toString());
    const isVariable = parseBoolean(formData.get('isVariable')?.toString());

    const images = parseJSON(formData.get('images')?.toString(), []);
    const variations = parseJSON(formData.get('variations')?.toString(), []);

    // Basic fields
    product.title = title || product.title;
    product.description = description;
    product.bestSeller = bestSeller;
    product.showHero = showHero;
    product.isFeatured = isFeatured;
    product.isVariable = isVariable;

    if (title) {
      product.slug = slugify(title, { lower: true, strict: true });
    }

    if (Array.isArray(images)) {
      product.images = images;
    }

    if (category && category !== 'undefined') {
      product.category = category;
    }

    if (isVariable) {
      product.variations = Array.isArray(variations)
        ? variations.map((item) => ({
            label: item?.label?.toString().trim() || '',
            unit: item?.unit?.toString().trim() || undefined,
            price: parseNumber(item?.price) ?? 0,
            stock: parseNumber(item?.stock) ?? 0,
          }))
        : [];

      // Clear simple product fields
      product.price = undefined;
      product.stock = undefined;
      product.weight = undefined;
      product.unit = undefined;
    } else {
      product.price = parseNumber(formData.get('price')?.toString()) ?? 0;

      // Your schema has stock as String, so keep it as string
      const stockValue = formData.get('stock')?.toString();
      product.stock = stockValue ?? '';

      product.weight = parseNumber(formData.get('weight')?.toString());

      // IMPORTANT:
      // unit is enum ['Grams', 'Oz', 'Pounds']
      // so never save empty string ''
      product.unit = unit || undefined;

      // Clear variable product fields
      product.variations = [];
    }

    const updatedProduct = await product.save();

    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/edit/${productId}`);
    revalidatePath(`/products/${updatedProduct.slug}`);

    return {
      ok: true,
      message: 'Product updated successfully',
    };
  } catch (error) {
    console.error('Error on Edit:', error);

    return {
      ok: false,
      message: error?.message || 'Failed to update product',
    };
  }
}