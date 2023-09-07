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
        <div className="grow flex gap-8 lg:min-w-[65%] ">
            <div className="flex flex-col gap-2 ">
                {matchingProduct?.images.map((image, i) => (
                    <Image
                        key={i}
                        src={urlFor(image).url()}
                        alt="Secondary Image"
                        width={278}
                        height={296}
                        onMouseEnter={() => setIndex(i)}
                        className="hover:cursor-pointer aspect-square w-[50px] xs:w-[80px] sm:w-[100px] md:w-[120px] "
                    />
                ))}
            </div>

            <div className="w-2/3 ">

                <Image
                    src={urlFor(matchingProduct.images[index]).url()}
                    alt={matchingProduct.name}
                    width={278}
                    height={296}
                    style={{ width: "100%", height: "auto" }}
                />

            </div>
        </div>
    )
}
