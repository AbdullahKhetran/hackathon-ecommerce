import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getAllProducts } from "@/sanity/sanity-utils";
import { displayProducts } from "@/components/utils";
import Copyright from "@/components/Footer/Copyright";

export default async function Products() {
    const products = await getAllProducts();
    return (
        <div>
            <div className='max-w-center'>
                <Navbar />
                {displayProducts(products)}
                <Footer />
            </div>
            <div className='border border-t border-productSubtitle'></div>

            <div className='max-w-center'>
                <Copyright />

            </div>
        </div>
    )
}
