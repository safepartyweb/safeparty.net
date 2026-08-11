// app/page.jsx
import Hero from "@/components/home/Hero";
import Bar from "@/components/home/Bar";
import SecLeftRight from "@/components/home/SecLeftRight";
import Marque from "@/components/home/Marque";
import Featured from "@/components/products/Featured";
import HomeSlider from "@/components/home/HomeSlider";
import BestSeller from "@/components/home/BestSeller";
import NewsLetter from "@/components/shared/NewsLetter";
import HomeQoutes from "@/components/home/HomeQoutes";
import SafeHands from "@/components/home/SafeHands";
import { getHomePageProducts } from "@/lib/data/home-products";
import AnimatedBlock from "@/components/shared/MotionParent";



export default async function Home() {

  const { heroProducts, bestSellers, featuredProducts } =
  await getHomePageProducts();
  return (
    
    <div className="">
      
      
      <Hero />


      <AnimatedBlock className='' direction="up">
        <Bar />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <BestSeller productsData={bestSellers} />
      </AnimatedBlock>     

      <AnimatedBlock className='' direction="up">
        <SecLeftRight />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <HomeQoutes />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <Featured productsData={featuredProducts} />
      </AnimatedBlock>


      <AnimatedBlock className='' direction="up">
        <Marque />
      </AnimatedBlock>



      <AnimatedBlock className='' direction="up">
        <HomeSlider />
      </AnimatedBlock>


      
      {/* <AnimatedBlock className='' direction="up">
        <NewArrivals productsData={data} />
      </AnimatedBlock> */}

      <AnimatedBlock className='' direction="up">
        <SafeHands />
      </AnimatedBlock>

      <AnimatedBlock className='' direction="up">
        <NewsLetter />
      </AnimatedBlock>

      {/* {showModal && <PopupModal onClose={handleClose} />} */}
      
      
    </div>
  );
}
