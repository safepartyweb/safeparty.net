'use client'
import { useGetProductBySlugQuery } from "@/lib/api/productApi";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import ThumbnailSlider from "@/components/ThumbnailSlider";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ProductPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null); // null initially

  const { data, isLoading } = useGetProductBySlugQuery({ slug });

  if (isLoading) {
    return <Loader />;
  }

  const product = data?.product;
  

  const handleAddToCart = () => {

    if(product.isVariable && !selectedVariation){
     return toast.error("Please select a variation!")
    }
    const variation = product.isVariable
      ? product.variations.find((v) => v._id === selectedVariation)
      : null;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.title,
        image: product?.images[0]?.url,
        price: variation ? variation.price : product.price,
        isVariable: product.isVariable ? product.isVariable : false ,
        variation: variation ? { label: variation.label, unit: variation.unit, id:selectedVariation } : null,
        variationId: variation ? selectedVariation : null,
        variationLabel: variation ? variation.label : null,
        quantity: parseInt(quantity),
      })
    );

    toast.success("Added to cart!")
  };

  return (
    <section className="sec_hero_bar py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{product?.title}</h1>
          <div className="product_wrap grid grid-cols-2 gap-16">
            <div className="images col-span-2 lg:col-span-1">
              <ThumbnailSlider images={product.images} />
            </div>

            <div className="prod_details">
              {!product.isVariable && (
                <p className="text-lg font-medium">Price: ${product.price}</p>
              )}

              <p className="text-lg font-medium">{product.description}</p>

              <div className="cart_btn_wrap my-4 flex flex-col gap-4">
                {product.isVariable && (
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Select Variation:</label>
                    {product.variations.map((variation) => (
                      <label
                        key={variation._id}
                        className={`cursor-pointer px-4 py-2 rounded border max-w-[250px] flex justify-between ${
                          selectedVariation === variation._id
                            ? "border-black bg-gray-200"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedVariation(variation._id)}
                      >
                        <span>{variation.label}</span> <span>${variation.price}</span>
                      </label>
                    ))}
                  </div>
                )}

                <div className="input_group flex gap-2 items-center">
                  <label className="block font-medium">Quantity:</label>
                  <input
                    className="border rounded px-3 py-2 max-w-[70px]"
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <button
                  className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold max-w-[175px] cursor-pointer"
                  onClick={handleAddToCart}
                  // disabled={product.isVariable && !selectedVariation}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
