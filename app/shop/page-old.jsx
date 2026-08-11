'use client'
import React,{useState, useEffect} from 'react'
import { useGetProductsQuery } from '@/lib/api/productApi'
import Loader from '@/components/Loader'
import ProductsGrid from '@/components/products/ProductsGrid'
import BlackButton from '@/components/BlackButton'
import { useGetCategoriesQuery } from '@/lib/api/categoryApi'
import slugify from "slugify";
import SingleProductItem from '@/components/admin/product/SingleProductItem'
import SingProductItemforGrid from '@/components/products/SingProductItemforGrid'



const page = () => {

  const [prods, setProds] = useState([]);
  const {data, isLoading} = useGetProductsQuery()
  // const {data:catData, isLoading:catLoading} = useGetCategoriesQuery()

  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {

    if(data){
      console.log("Data came to me!")
      setProds(data.products)
    }

  },[data])

  if(isLoading){
    return <Loader />
  }

  // console.log("data",data)
  // console.log("catData",catData)
  console.log("Products",prods)

  /*
  const searchHandler = (e) => {

    console.log("Search clicked!")
    // console.log("weight", weight)
    // console.log("unit", unit)

    const filteredProducts1 = data.products.filter(prod => {
      if(weight && unit ){
        return (prod.weight == weight && prod.unit == unit);
      }
      return true
      
    }).filter(prod => {
      if(type){
        return (prod.category?.slug == type);
      }

      return true
      
    })



    const filteredProducts = data.products.filter(prod => {
      if(type){
        return (prod.category?.slug == type);
      }

      return true
      
    })


    setProds(filteredProducts1)
    
  }

  const clearFilterHandler = () => {

    setWeight('')
    setUnit('')
    setType('')
    setProds(data.products)
  }
*/


  const grouped = prods.reduce((acc, product) => {
    const catName = product.category?.name || "Uncategorized";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(product);
    return acc;
  }, {});

  console.log("Grouped", grouped)
  const categories = Object.keys(grouped);



  return (
    <>
      <section className='sec_hero_bar py-6 md:py-10 '>
        <div className='container max-w-sitemax px-4 mx-auto '>
          <h1 className="text-2xl font-bold">All Products</h1>
        </div>
      </section>

      
        {/* Top Navigation Links */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${slugify(cat, { lower: true })}`}
              className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Product Sections */}
        {Object.entries(grouped).map(([categoryName, products]) => (
          <section
            key={categoryName}
            id={slugify(categoryName, { lower: true })}
            className="mb-16 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-6">{categoryName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                // <ProductCard key={product._id} product={product} />
                <SingProductItemforGrid key={product._id}  product={product} />
              ))}
            </div>
          </section>
        ))}


      
      {/* <section className='sec_hero_bar py-6 md:py-10 '>
        <div className='container max-w-sitemax px-4 mx-auto '>
          
          <div className="search_wrap flex flex-col xs:flex-row gap-2 sm:gap-4 items-start md:items-center">
            
            <div className="flex gap-1 items-center">
              <span>Quantity:</span>
              <input value={weight} onChange={(e) => {setWeight(e.target.value)}} type="text" className='border rounded px-1 py-2 max-w-[90px]' placeholder="Quantity" />
              <select className='border rounded px-1 py-2' value={unit} onChange={(e) => setUnit(e.target.value)} name="" id="">
                <option value="">Unit</option>
                <option value="Oz">Oz</option>
                <option value="Grams">Grams</option>
                <option value="Pounds">Pounds</option>
              </select>
            </div>
            
            <div className="flex gap-1 items-center">
              <span>Type:</span>
              <select className='border rounded px-1 py-2' value={type} onChange={(e) => setType(e.target.value)} name="" id="">
                <option value="">Select Type</option>
                {catData.map(cat => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}
              </select>
            </div>

            



          </div>

          <div className="flex gap-6 items-center mt-4">
            <div className='' onClick={searchHandler}>
              <BlackButton>Search</BlackButton>
            </div>
            <button className='underline cursor-pointer' onClick={clearFilterHandler}>Clear Filters</button>
          </div>

          
          

        </div>
      </section>

      <section className='sec_hero_bar py-6 md:py-10 '>
        <div className='container max-w-sitemax px-4 mx-auto '>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProductsGrid products={prods} />
        </div>

        </div>
      </section> */}




    </>
  )
}

export default page