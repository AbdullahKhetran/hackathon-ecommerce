import Image from "next/image";
import { getAllProducts } from "@/sanity/sanity-utils";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Copyright from "@/components/Footer/Copyright";
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from "sanity";
import { urlFor } from "@/sanity/sanity-utils";
import { Order } from "@/components/Order";
import ImageCarousel from "@/components/Product/Images";


export default async function ProductPage({ params }: { params: { id: string } }) {
    const products = await getAllProducts()

    const matchingProduct = products.find((product) => (
        product.slug.current === params.id
    ))

    let url: string = ""
    let details: PortableTextBlock[] = []
    let care: PortableTextBlock[] = []


    if (matchingProduct !== undefined) {
        url = urlFor(matchingProduct.image).url();
        details = matchingProduct.details
        care = matchingProduct.care
    }

    // console.log(matchingProduct?.images)
    return (
        <div >
            <div className='max-w-center'>
                <Navbar />
                <div className="mb-24 p-8 mx-16 xl:mx-32 bg-sectionSilver flex flex-col gap-8">
                    {/* Product Image and order */}

                    <div className="flex flex-col gap-8 lg:flex-row ">

                        {/* Image */}
                        <ImageCarousel matchingProduct={matchingProduct!} />

                        {/* Order */}
                        <Order matchingProduct={matchingProduct!} />

                    </div>

                    {/* Product details and care */}
                    <div className="bg-white flex flex-col gap-8 p-8 mt-16 max-w-7xl ">
                        <div className="flex border-b-2 border-[#c4c4c4] pb-8">
                            <div className="w-full h-full font-extrabold text-6xl opacity-10">Overview</div>
                            <h1 className="font-bold text-2xl absolute self-center tracking-wider">Product Information</h1>
                        </div>

                        <div className="flex flex-col gap-8 md:flex-row ">
                            <h2 className="text-productSubtitle font-bold tracking-wider text-xl flex-1">PRODUCT DETAILS</h2>
                            <div className="text-lg text-justify font-light tracking-wider text-darkGray flex-[2_1_0%]">
                                <PortableText value={details} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 md:flex-row ">
                            <h2 className="text-productSubtitle font-bold tracking-wider text-xl flex-1">PRODUCT CARE</h2>
                            <div className="prose text-lg flex-[2_1_0%]">
                                {/* TODO change bullet color to black */}
                                <PortableText value={care} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
            <div className='border border-t border-productSubtitle'></div>

            <div className='max-w-center'>
                <Copyright />
            </div>
        </div>
    )
}
