import connectMongo from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";

//get all products
export async function GET() {
  await connectMongo();
  const allProducts = await Product.find().populate({path:'category'});

  return Response.json({ message: "Success!", products:allProducts }, { status: 200 });
}

//create product

export async function POST(req) {
  await connectMongo();

  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  // Parse images from JSON string
  const images = JSON.parse(data.images || "[]");

  const title = data.title?.trim();
  const slug = slugify(title, { lower: true, strict: true });
  const description = data.description;
  const category = data.category;
  const bestSeller = data.bestSeller === 'true';
  const showHero = data.showHero === 'true';
  const isFeatured = data.isFeatured === 'true';
  const isVariable = data.isVariable === 'true';

  // Check if product already exists
  const existingProduct = await Product.findOne({ title });
  if (existingProduct) {
    return Response.json(
      { message: "A product with this title already exists." },
      { status: 409 }
    );
  }

  try {
    let productData = {
      title,
      slug,
      description,
      images,
      bestSeller,
      showHero,
      isFeatured,
      isVariable,
      category
    };

    if (isVariable) {
      const variations = JSON.parse(data.variations || "[]");
      productData.variations = variations;
    } else {
      productData.price = Number(data.price);
      productData.stock = Number(data.stock);
    }

    const newProduct = await Product.create(productData);

    return Response.json(
      { message: "Product created successfully", product: newProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return Response.json({ message: "Something went wrong!", error }, { status: 500 });
  }
}


//delete product
export async function DELETE(req) {
  await connectMongo();
  // const formData = await req.formData();
  // const data = Object.fromEntries(formData);
  // console.log("data",data)

  const data = await req.json()

  console.log("data",data)

  const productId = data.productId;


  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
      throw new Error("Product not found!")
    }

    return Response.json({ message: "deleted successfully!", product:deletedProduct, staus:200, }, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
  


  //return Response.json({ message: "PATCH route!" }, { status: 200 });
}


