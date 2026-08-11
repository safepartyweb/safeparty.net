import connectMongo from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";

export async function GET() {
  await connectMongo();

  try {
    const products = await Product.find({ slug: { $exists: false } });

    for (const product of products) {
      product.slug = slugify(product.title, { lower: true, strict: true });
      await product.save();
    }

    return Response.json({ message: `Updated ${products.length} products.` });
  } catch (error) {
    console.error("Error updating slugs:", error);
    return Response.json({ message: "Slug update failed", error }, { status: 500 });
  }
}
