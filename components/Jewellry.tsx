import jewellry from "@/public/feature.webp"
import Image from "next/image"
import Button from "./Buttons"

export default function Jewellry() {
    return (

        <div className='my-24 mx-8 md:mx-16 xl:mx-32 '>

            <h1 className=" text-5xl text-gray-800 font-bold leading-snug mb-6">Unique and Authentic Vintage Designer Jewellery</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 justify-around gap-16">
                <div className="grid grid-cols-2 gap-8 relative">
                    <div className="absolute w-full h-full text-7xl font-extrabold leading-loose tracking-widest opacity-10  ">
                        Different from Others
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Using Good Quality Materials</h1>
                        <p className="text-xl text-gray-700 ">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">100% Handmade Products</h1>
                        <p className="text-xl text-gray-700 ">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Modern Fashion Design</h1>
                        <p className="text-xl text-gray-700 ">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Discount for Bulk Orders</h1>
                        <p className="text-xl text-gray-700 ">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>

                </div>

                <div className="flex flex-col items-center md:flex-row gap-8">
                    <Image
                        src={jewellry}
                        alt="Jewellery Collection"
                        width={300}
                        height={350}
                        className="aspect-[300/350] min-w-[40%] xl:h-full"
                    />
                    <div className="flex flex-col gap-8">
                        <p className="max-w-[100%] text-xl text-[#212121] leading-relaxed text-justify">This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.</p>
                        <Button content="See all products" path="/products" />
                    </div>
                </div>
            </div>
        </div>

    )
}