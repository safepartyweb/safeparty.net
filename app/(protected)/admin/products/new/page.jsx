"use client";
import { useState } from "react";
import uploadImage from "@/components/admin/UploadImage";
import Image from "next/image";
import { useCreateProductMutation } from "@/lib/api/productApi";
import BlackButton from "@/components/BlackButton";
import Checkbox from '@/images/checkbox-black.svg'
import CheckboxChecked from '@/images/checkbox-black-checked.svg'
import Loader from "@/components/Loader";
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';
import { useGetCategoriesQuery } from '@/lib/api/categoryApi';


export default function AddProduct() {

  const { data:catData, isLoading:catLoading, isError, error } = useGetCategoriesQuery();
  
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    stock: "",
    images: [],
    bestSeller:false,
    showHero:false,
    isFeatured:false,
    category:'',
  });

  const [showLoader, setShowLoader] = useState(false)
  const [isVariable, setIsVariable] = useState(false);
  const [variations, setVariations] = useState([
    { label: "", unit: "", price: "", stock: "" }
  ]);






  const [createProduct, {isLoading}] = useCreateProductMutation();
  const router = useRouter();
  
  //image upload
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if(name !== 'image'){
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }else{
      const files = Array.from(e.target.files);
      const imgApiRes =  await uploadImage(files)
      console.log("imgApiRes",imgApiRes)
      
      
      setData((prev) => ({
        ...prev,
        images: imgApiRes
      }))    
    }
  };

  const bestSellerHandler = (e) =>{
    const isChecked = e.target.checked;
    // console.log("Best Seller:", isChecked);
    setData((prev) => ({
      ...prev,
      bestSeller: isChecked
    }))
    
  }

  const showHeroHandler = (e) =>{
    const isChecked = e.target.checked;
    // console.log("Best Seller:", isChecked);
    setData((prev) => ({
      ...prev,
      bestSeller: isChecked
    }))
    
  }



  const handleVariationChange = (index, field, value) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };
  
  const addVariation = () => {
    setVariations([...variations, { label: "", unit: "", price: "", stock: "" }]);
  };
  
  const removeVariation = (index) => {
    const updated = variations.filter((_, i) => i !== index);
    setVariations(updated);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("bestSeller", data.bestSeller);
    formData.append("showHero", data.showHero);
    formData.append("isFeatured", data.isFeatured);
    formData.append("images", JSON.stringify(data.images));
    formData.append("isVariable", isVariable);
    formData.append("category", data.category);
  
    // console.log("Variations:", variations);
    // console.log("category:", data.category);

    if (isVariable) {
      formData.append("variations", JSON.stringify(variations));
    } else {
      formData.append("price", data.price);
      formData.append("stock", data.stock);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    
    try {
      const apiRes = await createProduct(formData).unwrap();
      toast.success("Product added successfully.");
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong.");
    } finally {
      setShowLoader(false);
    }
    


    
  };
  
  if(catLoading) return <Loader />
  if(isError){
    console.log("Cat data error:", error)
  }
  
  // console.log("categories Data:", catData)



  return (
    <div className="new_product p-0 md:p-6 bg-white rounded shadow">
      {showLoader && <Loader /> }
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="input_group">
          <label className="block font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            accept="image/*"
            multiple
          />
          {data?.images[0] ? <Image src={data?.images[0]?.url} alt="Product Image" width={50} height={50} /> : ''}
          
        </div>
        

        <div className="input_group">
          <label className="block font-medium">Product Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>


        <div className="input_group">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>


        <div className="input_group">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div className="input_group flex gap-2 items-center">
          <input onChange={bestSellerHandler} id="bestseller" name="bestseller" type="checkbox"  className="bestSeller" />
          <label  htmlFor="bestseller" className="block font-medium ">
            <Image className="normal" src={Checkbox} alt="icon" width={32} height={32} />
            <Image className="checked" src={CheckboxChecked} alt="icon" width={32} height={32} />
            Best Seller?
          </label>
        </div>

        <div className="input_group flex gap-2 items-center">
          <input onChange={showHeroHandler} id="showHero" name="showHero" type="checkbox"  className="bestSeller" />
          <label  htmlFor="showHero" className="block font-medium ">
            <Image className="normal" src={Checkbox} alt="icon" width={32} height={32} />
            <Image className="checked" src={CheckboxChecked} alt="icon" width={32} height={32} />
            Show on hero slider?
          </label>
        </div>


        <div className="input_group">
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={data.stock}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select value={data.category} name='category' onChange={handleChange} className="border w-full p-2 rounded">
            <option value="">Select One</option>
            {catData.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>



        <div className="input_group">
          <label className="block font-medium">Variable Product?</label>
          <input
            type="checkbox"
            checked={isVariable}
            onChange={() => setIsVariable(!isVariable)}
            className="mr-2"
          />
        </div>

        {isVariable && (
          <div className="space-y-4">
            <label className="block font-medium">Product Variations</label>
            {variations.map((v, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Label (e.g. 250g)"
                  value={v.label}
                  onChange={(e) => handleVariationChange(i, "label", e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g. g, ml)"
                  value={v.unit}
                  onChange={(e) => handleVariationChange(i, "unit", e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={v.price}
                  onChange={(e) => handleVariationChange(i, "price", e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={v.stock}
                  onChange={(e) => handleVariationChange(i, "stock", e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeVariation(i)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariation}
              className="bg-gray-800 text-white px-3 py-1 rounded"
            >
              + Add Variation
            </button>
          </div>
        )}




        <button className="bg-siteBlack text-white border border-siteBlack rounded hover:bg-white hover:text-siteBlack px-6 py-3 font-bold font-lg inline-block cursor-pointer">Add Product</button>

      </form>
    </div>
  );
}
