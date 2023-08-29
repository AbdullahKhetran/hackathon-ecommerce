import Navbar from "@/components/Navbar/Navbar";
import clientConfig from "@/sanity/config/client-config";
import imageUrlBuilder from "@sanity/image-url"
import Footer from "@/components/Footer/Footer";
import { displayProducts } from "@/components/utils";
import Copyright from "@/components/Footer/Copyright";
import { getMaleProducts } from "@/sanity/sanity-utils";

export default async function Male() {
    const menProducts = await getMaleProducts()
    return (
        <div>
            <div className='max-w-center'>
                <Navbar />
                {displayProducts(menProducts)}
                <Footer />
            </div>
            <div className='border border-t border-productSubtitle'></div>
            <div className='max-w-center'>
                <Copyright />
            </div>


        </div>
    )
}