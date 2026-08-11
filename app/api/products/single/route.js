import connectMongo from "@/lib/db";
import Product from "@/models/Product";

//get single products
export async function POST(req) {
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const slug = data.slug;
  const product = await Product.findOne({slug});

  if(product){
    return Response.json({ message: "Success!", product }, { status: 200 });
  }else{
    return Response.json({ message: "Product not found!", }, { status: 404 });
  }

  
}






