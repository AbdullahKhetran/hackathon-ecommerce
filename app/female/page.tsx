import { displayProducts } from "@/components/utils"
import Footer from "@/components/Footer/Footer"
import Copyright from "@/components/Footer/Copyright"
import Navbar from "@/components/Navbar/Navbar"
import { getFemaleProducts } from "@/sanity/sanity-utils"

export default async function Female() {
    const femaleProducts = await getFemaleProducts();

    return (
        <div >
            <div className='max-w-center'>
                <Navbar />
                {displayProducts(femaleProducts)}
                <Footer />
            </div>
            <div className='border border-t border-productSubtitle'></div>

            <div className="max-w-center">
                <Copyright />
            </div>
        </div>
    )
}