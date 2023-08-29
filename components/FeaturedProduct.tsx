import { getFeaturedProducts } from "@/sanity/sanity-utils";
import { displayFeaturedProduct } from "./utils";


export default async function FeaturedProduct() {
    const featuredProducts = await getFeaturedProducts()

    return (
        <div className=' flex flex-col items-center gap-4 my-24 mx-8 md:mx-16 xl:mx-32  '>
            <h1 className="text-sm font-bold text-blue-600">PRODUCTS</h1>
            <h2 className="font-bold text-4xl text-center tracking-wider">Check What We Have</h2>

            <div className="flex gap-12 mt-4">

                {/* cant use a loop because styling is different for each item */}
                <div>
                    {displayFeaturedProduct(featuredProducts[0])}
                </div>
                <div className="hidden md:block">
                    {displayFeaturedProduct(featuredProducts[1])}
                </div>
                <div className="hidden lg:block">
                    {displayFeaturedProduct(featuredProducts[2])}
                </div>
                <div className="hidden xl:block">
                    {displayFeaturedProduct(featuredProducts[3])}
                </div>

            </div>
        </div>
    )
}