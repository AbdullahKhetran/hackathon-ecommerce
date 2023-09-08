"use client"
import { getAllProducts, urlFor } from "@/sanity/sanity-utils"
import { Product } from "@/types/sanity"
import { X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

type Prop = {
    fn: VoidFunction
}

export default function SmSearchBar({ fn }: Prop) {

    // to disable scrolling when this component mounts
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [products, setProducts] = useState<Product[]>([])
    const [dataAvailable, setDataAvailable] = useState(false)
    const [activeSearch, setActiveSearch] = useState<Product[]>([])




    async function handleSearchBarClick() {
        if (!dataAvailable) {
            const data = await getAllProducts()
            setProducts(data)
            setDataAvailable(true)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setActiveSearch([])
            return false
        }
        setActiveSearch(products?.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }


    return (
        <div className="flex flex-col gap-4 p-8 md:px-16 fixed top-0 left-0  w-full h-full bg-white ">

            <div className="flex justify-between gap-2">
                <input type="text" placeholder="Search Products"
                    onClick={handleSearchBarClick}
                    onChange={(e) => handleSearch(e)}
                    className="grow p-2 text-lg focus:outline-none rounded-md border-2 "
                />
                <button onClick={fn} >
                    <X size={38} />
                </button>
            </div>

            {activeSearch.length > 0 && (
                <div className=" p-2 rounded-lg border bg-white text-black flex flex-col gap-2 ">
                    {activeSearch.map(product => (
                        <Link key={product._id} href={`/products/${product.slug.current}`}
                            className='flex justify-between hover:bg-gray-200 rounded-md p-1 text-lg border-b'
                        >
                            <div className="flex flex-col">
                                <h1 className="font-medium">{product.name}</h1>
                                <h2>${product.price}</h2>
                                <h2 className="text-black/70">{product.category}</h2>
                            </div>
                            <Image src={urlFor(product.image).url()}
                                alt={`Image of ${product.name}`}
                                width={80}
                                height={50}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
