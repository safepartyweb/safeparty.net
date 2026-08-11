import React from 'react'
import SingProductItemforGrid from './SingProductItemforGrid';

const ProductsGrid = ({products}) => {

  // console.log("products Grid", products)
  // console.log("isArray?", Array.isArray(products));


  if (!Array.isArray(products)) {
    // console.error("❌ 'products' is not an array:", products);
    return <p>Error: Products data is invalid.</p>;
  }



  return (
    <>
    
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <SingProductItemforGrid product={product} />
        </div>
      ))}



    </>
  )
}

export default ProductsGrid