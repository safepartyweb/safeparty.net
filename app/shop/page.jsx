import slugify from "slugify";
import SingProductItemforGrid from "@/components/products/SingProductItemforGrid";
import { getShopProductsData } from "@/lib/data/shop-products";
import CategoryNav from "./CategoryNav";

// always fetch fresh data (optional)
export const dynamic = "force-dynamic";

const Page = async () => {
  const { products = [], categories = [] } = await getShopProductsData();

  const filteredCats = categories
    .filter((cat) =>
      products.some(
        (product) =>
          product.category?._id?.toString() === cat._id?.toString()
      )
    )
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="scroll-smooth">
      <section className="sec_hero_bar py-6 md:py-10">
        <div className="container mx-auto max-w-sitemax px-4">
          <h1 className="text-2xl font-bold">All Products</h1>
        </div>
      </section>

      <section className="sec_hero_bar py-6 md:py-10">
        <div className="container mx-auto max-w-sitemax px-4">
          
          {/* <div className="mb-12 flex flex-wrap justify-center gap-4">
            {filteredCats.map((cat) => (
              <a
                key={cat._id}
                href={`#${slugify(cat.name, { lower: true, strict: true })}`}
                className="cursor-pointer rounded border border-black px-4 py-2 transition hover:bg-black hover:text-white"
              >
                {cat.name}
              </a>
            ))}
          </div> */}

        <CategoryNav categories={filteredCats} />




          {filteredCats.map((cat) => {
            const catProducts = products.filter(
              (product) =>
                product.category?._id?.toString() === cat._id?.toString()
            );

            return (
              <section
                key={cat._id}
                id={slugify(cat.name, { lower: true, strict: true })}
                className="mb-16 scroll-mt-24 border-b border-gray-300 pb-10"
              >
                <h2 className="mb-10 text-center text-4xl font-bold">
                  {cat.name}
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  {catProducts.map((product) => (
                    <SingProductItemforGrid
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Page;