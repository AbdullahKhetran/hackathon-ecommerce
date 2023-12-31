"use client"
import { Search } from 'lucide-react'
import { getAllProducts, urlFor } from "@/sanity/sanity-utils"
import { Product } from "@/types/sanity"
import { useState, useEffect, useRef } from "react"
import Link from 'next/link'
import Image from 'next/image'

export default function LgSearchBar() {
    const [products, setProducts] = useState<Product[]>([])
    const [dataAvailable, setDataAvailable] = useState(false)

    const [activeSearch, setActiveSearch] = useState<Product[]>([])

    const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false)
    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const searchResultsRef = useRef<HTMLInputElement | null>(null);

    async function handleSearchBarClick() {
        // if data is not set then fetch data
        if (!dataAvailable) {
            const data = await getAllProducts()
            // console.log("data fetched")
            setProducts(data)
            setDataAvailable(true)
            // console.log("data set")
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setActiveSearch([])
            setIsSearchResultsOpen(false)
            return false
        }
        setActiveSearch(products?.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())))
        setIsSearchResultsOpen(true)
    }

    // by chatgpt
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                // Check if the click is outside the searchBarRef (search bar) and searchResultsRef (search results div)
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target as Node) &&
                searchResultsRef.current &&
                !searchResultsRef.current.contains(event.target as Node)
            ) {
                setIsSearchResultsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    return (
        <div className="flex gap-2 p-1 border rounded-md w-[30%] relative">

            <Search size={20} strokeWidth={1} />
            <input type="text" placeholder="Search products"
                onClick={handleSearchBarClick}
                onChange={(e) => handleSearch(e)}
                className="grow focus:outline-none"
                ref={searchBarRef}
            />
            {
                isSearchResultsOpen && activeSearch.length > 0 && (
                    <div ref={searchResultsRef} className="absolute top-9 p-2 w-full rounded-lg border bg-white text-black z-10  flex flex-col gap-2 ">
                        {
                            activeSearch.map(product => (
                                <Link key={product._id} href={`/products/${product.slug.current}`}
                                    className='flex justify-between hover:bg-gray-200 rounded-md px-1 text-lg'>

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
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}