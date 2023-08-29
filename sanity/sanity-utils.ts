import clientConfig from "@/sanity/config/client-config"
import { createClient, groq } from "next-sanity";
import { Brand, Product } from "@/types/sanity"
import imageUrlBuilder from "@sanity/image-url"
import { MyProduct } from "@/types/products";

// Image Url builder
const builder = imageUrlBuilder(clientConfig)

// source will be image
export function urlFor(source: Object) {
    return builder.image(source)
}


export function getAllProducts(): Promise<Product[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "products"]{
            _id,
            name,
            gender,
            price,
            category,
            image,
            slug,
            details,
            care,
            images,
        }`
    )
}

export function getFemaleProducts(): Promise<Product[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "products" && gender == "female"]{
            _id,
            name,            
            price,
            category,
            image,
            slug,
            details,
            care,
            images,
            // Not needed but this is how you url can be shown, run in groq playground
            // "imageUrl": image.asset->url
        }`
    )
}

export function getMaleProducts(): Promise<Product[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "products" && gender == "male"]{
            _id,
            name,            
            price,
            category,
            image,
            slug,
            details,
            care,
            images,
        }`
    )
}

export function getKidsProducts(): Promise<Product[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "products" && gender == "kids"]{
          _id,
            name,
            gender,
            price,
            image,
            category,
            images,
        }`
    )
}

export function getBrandLogos(): Promise<Brand[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "brands"] {
            _id,
            name,
            logo,
            slug
        }`
    )
}

export function getFeaturedProducts(): Promise<Product[]> {
    // going to get first 4 female products
    return createClient(clientConfig).fetch(
        groq`*[_type == "products" && gender == "female"][0..3]{
              _id,
                name,            
                price,
                image,
                slug,
        }`
    )
}
export function getSpecificProduct(productId: string): Promise<MyProduct> {
    // console.log("I got this argument", productId, "type is", typeof productId)
    return createClient(clientConfig).fetch(
        groq`*[_type == "products" && _id == $productId][0]{            
            _id,
            name,            
            price,
            category,
            image,
            slug,
        }`,
        { productId }
    )
}

