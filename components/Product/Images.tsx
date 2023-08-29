"use client"
import { urlFor } from "@/sanity/sanity-utils"
import { Product } from "@/types/sanity"
import Image from "next/image"
import { useState } from "react"


type Props = {
    matchingProduct: Product
}

export default function ImageCarousel({ matchingProduct }: Props) {
    const [index, setIndex] = useState(0)
    return (
        <div className="flex gap-8 ">
            <div className="flex flex-col gap-2 justify-between">
                {matchingProduct?.images.map((image, i) => (
                    <Image
                        key={i}
                        src={urlFor(image).url()}
                        alt="Secondary Image"
                        width={150}
                        height={150}
                        onMouseEnter={() => setIndex(i)}
                        className="hover:cursor-pointer"
                    />
                ))}
            </div>

            <div className="w-full h-full">
                <Image
                    src={urlFor(matchingProduct.images[index]).url()}
                    alt={matchingProduct.name}
                    width={500}
                    height={500}
                />
            </div>
        </div>
    )
}
