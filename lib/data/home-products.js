import connectMongo from "@/lib/db";
import Product from "@/models/Product";

function serializeProduct(product) {
  return {
    _id: product._id.toString(),
    title: product.title ?? "",
    slug: product.slug ?? "",
    price: product.price ?? 0,
    description: product.description ?? "",
    stock: product.stock ?? "",
    images: (product.images || []).map((img) => ({
      url: img.url ?? "",
      public_id: img.public_id ?? "",
    })),
    unit: product.unit ?? null,
    weight: product.weight ?? null,
    category: product.category ? product.category.toString() : null,
    bestSeller: !!product.bestSeller,
    showHero: !!product.showHero,
    isFeatured: !!product.isFeatured,
    isVariable: !!product.isVariable,
    variations: (product.variations || []).map((variation) => ({
      _id: variation._id?.toString?.() ?? "",
      label: variation.label ?? "",
      unit: variation.unit ?? "",
      price: variation.price ?? 0,
      stock: variation.stock ?? 0,
    })),
  };
}

export async function getHomePageProducts() {
  await connectMongo();

  const [heroProductsRaw, bestSellersRaw, featuredProductsRaw] = await Promise.all([
    Product.find({ showHero: true })
      .select("title slug price description stock images unit weight category bestSeller showHero isFeatured isVariable variations")
      .sort({ _id: -1 })
      .limit(6)
      .lean(),

    Product.find({ bestSeller: true })
      .select("title slug price description stock images unit weight category bestSeller showHero isFeatured isVariable variations")
      .sort({ _id: -1 })
      .limit(12)
      .lean(),

    Product.find({ isFeatured: true })
      .select("title slug price description stock images unit weight category bestSeller showHero isFeatured isVariable variations")
      .sort({ _id: -1 })
      .limit(6)
      .lean(),
  ]);

  return {
    heroProducts: heroProductsRaw.map(serializeProduct),
    bestSellers: bestSellersRaw.map(serializeProduct),
    featuredProducts: featuredProductsRaw.map(serializeProduct),
  };
}