import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import header from "@/public/header.webp"
import Image from 'next/image';
import { getBrandLogos } from '@/sanity/sanity-utils';
import { displayLogos } from './utils';

export default async function MainSection() {
    const brandLogos = await getBrandLogos()

    return (

        <div className='flex gap-16 mt-16 mb-24 mx-8 md:mx-16 xl:mx-32'>


            <div className='flex flex-col justify-between gap-4 md:gap-10 pt-8 lg:pt-12'>
                <div className='flex flex-col gap-8'>
                    <span className='w-[120px] h-10 py-2 px-4 bg-blue-100 text-blue-700 font-semibold rounded-lg'>
                        Sale 70%
                    </span>

                    <h1 className='text-darkGray text-5xl font-semibold lg:text-6xl lg:font-bold tracking:wide'>An Industrial Take on Streetwear</h1>
                    <p className='text-gray-500 w-[70%] text-base '>Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>

                    <Link
                        href="/products"
                        className="w-[80%] sm:w-[60%] lg:w-1/2"
                    >
                        <button className="flex justify-center items-center gap-2 bg-darkGray text-white font-bold p-3 border-2 border-l-gray-600 border-t-gray-600 border-r-black border-b-black">
                            <ShoppingCart />
                            Start Shopping
                        </button>

                    </Link>
                </div>

                <div >
                    {displayLogos(brandLogos)}
                </div>
            </div>


            <div className='hidden lg:flex '>
                <div className='w-[600px] h-[600px] bg-[#ffece3] rounded-[50%] relative'>
                    <Image
                        src={header}
                        alt='Featured Image'
                        height={650}
                        className='aspect-square overflow-visible max-w-none absolute top-[-5%]'
                    />
                </div>
            </div>


        </div>
    )
}