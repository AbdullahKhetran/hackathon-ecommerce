import { Image } from "sanity"

// sanity will return this to be displayed on cartpage
export interface MyProduct {
    _id: string,
    name: string,
    price: number,
    category: string,
    image: Image,
    slug: { current: string; _type: string; },
}

export type CombinedProduct = {
    id: string,
    name: string,
    category: string,
    image: Image,
    price: number,
    quantity: number,
    amount: number
}
