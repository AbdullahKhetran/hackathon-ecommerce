import Image from "next/image"
import Link from "next/link"
import { Brand, Product } from "@/types/sanity"
import { urlFor } from "@/sanity/sanity-utils"


export function displayProducts(products: Product[]) {
    return (

        <div className="grid gap-8 
             xs:grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-3 xl:grid-cols-4
             mx-20 justify-around justify-items-center ">

            {products.map((product) => (
                <Link
                    key={product._id}
                    href={`/products/${product.slug.current}`}
                    className={`flex flex-col w-[250px]`}>
                    {/* set parent's width to image width so that "break-words" can be applied on text */}

                    < Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        width={250}
                        height={270}
                    />
                    <h1 className="mt-1 text-xl font-semibold break-words tracking-wide">{product.name}</h1>
                    <h1 className="mt-1 text-lg font-bold   text-black/60 break-words">
                        {product.category}
                    </h1>
                    <h2 className="mt-1 text-2xl font-semibold tracking-wide" >{"$" + product.price}</h2>
                </Link>
            ))}
        </div >
    )
}

export function displayLogos(brands: Brand[]) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {brands.map((brand) => (
                <Image
                    src={urlFor(brand.logo).url()}
                    key={brand._id}
                    alt="Brands Logo"
                    width={92}
                    height={30}
                    className=" aspect-[92/30]" />
            ))}
        </div>
    )

}

export function displayFeaturedProduct(product: Product) {
    return (

        <Link
            href={`/products/${product.slug.current}`}
            className="flex flex-col items-center hover:scale-110 hover:transition-transform" >
            <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={370}
                height={394} />
            <h1 className="mt-1 text-xl font-semibold break-words tracking-wide">{product.name}</h1>
            <h2 className="mt-1 text-2xl font-semibold tracking-wide" >{"$" + product.price}</h2>
        </Link>

    )
}