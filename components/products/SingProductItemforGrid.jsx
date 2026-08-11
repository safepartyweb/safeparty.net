"use client";

import React, { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "@/store/cartSlice";

const SingleProductItemForGrid = ({ product }) => {
  const dispatch = useDispatch();

  const {
    _id,
    title = "Untitled Product",
    slug = "",
    images = [],
    price,
    isVariable = false,
    variations = [],
  } = product || {};

  const imageSrc = useMemo(() => {
    return images?.[0]?.url || "/images/prod-new.jpg";
  }, [images]);

  const priceRange = useMemo(() => {
    if (!isVariable || !Array.isArray(variations) || variations.length === 0) {
      return null;
    }

    const validPrices = variations
      .map((variation) => Number(variation?.price))
      .filter((value) => !Number.isNaN(value));

    if (validPrices.length === 0) return null;

    return {
      lowest: Math.min(...validPrices),
      highest: Math.max(...validPrices),
    };
  }, [isVariable, variations]);

  const displayPrice = useMemo(() => {
    if (isVariable && priceRange) {
      return `$${priceRange.lowest} - $${priceRange.highest}`;
    }

    return typeof price !== "undefined" ? `$${price}` : "Price unavailable";
  }, [isVariable, priceRange, price]);

  const handleAddToCart = useCallback(() => {
    if (!_id) return;

    dispatch(
      addToCart({
        productId: _id,
        name: title,
        image: imageSrc,
        price,
        quantity: 1,
        isVariable: false,
      })
    );

    toast.success("Added to cart!");
  }, [_id, title, imageSrc, price, dispatch]);

  if (!product) return null;

  return (
    <div className="flex flex-col gap-4 rounded bg-gray-100 p-4">
      <Link href={`/products/${slug}`} className="block">
        <Image
          className="mx-auto h-[212px] w-auto rounded object-cover"
          src={imageSrc}
          width={300}
          height={212}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          alt={title}
        />
      </Link>

      <div className="flex flex-col gap-1">
        <h2 className="text-center text-lg font-semibold">{title}</h2>
        <p className="product_price text-center text-lg font-bold">
          {displayPrice}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          href={`/products/${slug}`}
          className="inline-block max-w-[175px] rounded border border-siteBlack bg-siteBlack px-6 py-3 font-bold text-white hover:bg-white hover:text-siteBlack"
        >
          View Details
        </Link>

        {!isVariable && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-block max-w-[175px] rounded border border-siteBlack bg-siteBlack px-6 py-3 font-bold text-white hover:bg-white hover:text-siteBlack"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(SingleProductItemForGrid);