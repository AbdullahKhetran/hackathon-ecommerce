import { CombinedProduct } from "@/types/products";

export async function getData(uid: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart?userid=${uid}`)
    // const res = await fetch(`http://localhost:3000/api/cart?userid=${uid}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data: CombinedProduct[] = await res.json()

    return data
}