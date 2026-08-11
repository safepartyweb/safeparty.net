import connectMongo from '@/lib/db'
import Product from '@/models/Product'
import Category from '@/models/Category'

export async function getShopProductsData() {
  await connectMongo()

  const [products, categories] = await Promise.all([
    Product.find({})
      .populate('category')
      .lean(),
    Category.find({}).lean(),
  ])

  const serializedProducts = JSON.parse(JSON.stringify(products))
  const serializedCategories = JSON.parse(JSON.stringify(categories))

  return {
    products: serializedProducts,
    categories: serializedCategories,
  }
}