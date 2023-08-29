import { Image, PortableTextBlock } from "sanity";


export type Brand = {
    _id: string,
    _createdAt: Date,
    name: string,
    logo: string,
    slug: string,
}


export type Product = {
    _id: string,
    _createdAt: Date,
    name: string,
    gender: string,
    category: string,
    // image: string,
    image: Image,
    images: Image[],
    slug: {
        current: string,
        _type: string
    },
    price: number,
    details: PortableTextBlock[],
    care: PortableTextBlock[],

}

