import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { displayProducts } from "@/components/utils";
import Copyright from "@/components/Footer/Copyright";
import { getKidsProducts } from "@/sanity/sanity-utils";


export default async function Kids() {
    const kidsProducts = await getKidsProducts()
    return (
        <div>
            <div className='max-w-center'>
                <Navbar />

                {kidsProducts.length > 0 ? displayProducts(kidsProducts) : <NoProducts />}

                <Footer />
            </div>
            <div className='border border-t border-productSubtitle'></div>

            <div className='max-w-center'>
                <Copyright />

            </div>
        </div>
    )
}

function NoProducts() {
    return (
        <div className="mx-16 xl:mx-32 px-16 my-16 flex flex-col gap-12">
            <h1 className="text-5xl text-black/70 font-bold text-center">Kids Products are currently unavailable</h1>
            <h1 className="text-5xl text-black/60 font-semibold text-center">Check again later</h1>
        </div>
    )
}