import connectMongo from "@/lib/db";
import Product from "@/models/Product";

//get single products
export async function GET(req, { params }) {
  await connectMongo();
  const { slug } = await params;
  const product = await Product.findOne({slug});

  if(product){
    return Response.json({ message: "Success!", product }, { status: 200 });
  }else{
    return Response.json({ message: "Product not found!", }, { status: 404 });
  }

  
}




