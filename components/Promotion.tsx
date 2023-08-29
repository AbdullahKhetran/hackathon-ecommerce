import Image from "next/image"
import event1 from "@/public/event1.webp"
import event2 from "@/public/event2.webp"
import event3 from "@/public/event3.webp"

export default function Promotions() {
    return (
        <div className='my-24 mx-8 md:mx-16 xl:mx-32 max-w-sc    '>

            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-sm font-bold text-blue-600">PROMOTIONS</h1>
                <h2 className="font-semibold text-3xl">Our Promotions Events</h2>
            </div>

            <div className="mt-4 flex flex-col lg:flex-row gap-4 ">
                {/* 60% and 30% off */}
                <div className="flex flex-col gap-4">
                    <div className="bg-promotionCard flex flex-col items-center xs:flex-row justify-around px-4 pt-4">
                        <div className="flex flex-col justify-center">
                            <h1 className="font-medium text-3xl">GET UP TO <span className="font-bold text-4xl">60%</span></h1>
                            <p className="text-lg">For the summer season</p>
                        </div>
                        <Image
                            src={event1}
                            alt="Promotion"

                        />
                    </div>
                    <div className="bg-darkGray text-white p-12 flex flex-col justify-center items-center">
                        {/* give spacing in h1 */}
                        <h1 className="font-extrabold text-4xl mb-4">GET 30% OFF</h1>
                        <p className="text-sm">USE PROMO CODE</p>
                        <button className="bg-stone-600 font-bold text-lg p-2 rounded-lg py-2 px-10 mt-1">DINEWEEKENDSALE</button>
                    </div>
                </div>

                {/* highlighted products */}
                <div className="flex flex-col md:flex-row justify-between gap-4 ">
                    <div className=" flex flex-col justify-between bg-promotionProduct pt-6 pl-6 w-full">
                        <div >

                            <h1>Flex Sweatshirt</h1>
                            <span className="text-lg line-through ">$100</span> <span className="font-bold text-xl">$75</span>
                        </div>
                        <Image
                            src={event2}
                            alt="T Shirt on discount"
                            width={282}
                            height={362}
                            className="self-center aspect-[282/362]"
                        />
                    </div>

                    <div className="flex flex-col justify-between bg-promotionProduct2 pt-6 pl-6 w-full">

                        <div>
                            <h1>Flex Push Button Bomber</h1>
                            <span className=" text-lg line-through">$225</span> <span className="font-bold text-xl">$190</span>
                        </div>
                        <Image
                            src={event3}
                            alt="Jacket on discount"
                            width={282}
                            height={368}
                            className="self-center aspect-[282/362]" />
                    </div>
                </div>
            </div>

        </div>
    )
}