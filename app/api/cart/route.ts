import { Cart } from "@/lib/drizzle";
import { getSpecificProduct, urlFor } from "@/sanity/sanity-utils";
import { MyProduct } from "@/types/products";
import { CombinedProduct } from "@/types/products";

import { cartTable, db, NewCart } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";


function getIdsFromDb(items: Cart[]) {
    const productId: string[] = items.map((item) => item.productid);
    return productId;

}
async function getProductsFromSanity(ids: string[]) {
    const products: MyProduct[] = []

    const productPromises = ids.map(async (id) => {
        let product = await getSpecificProduct(id)
        return product
    })

    // Wait to resolve all promises and add them to the array using spread operator
    products.push(...await Promise.all(productPromises))

    return products
}

function makeCombinedProductsArray(res: Cart[], sanityProducts: MyProduct[]) {

    const combinedProductsArray: CombinedProduct[] = []

    sanityProducts.map((sanityProduct) => {
        // match the product with databse product
        const dbProduct = res.find(dbProduct => dbProduct.productid === sanityProduct._id)

        const combinedProduct: CombinedProduct = {
            id: dbProduct!.productid,
            name: sanityProduct.name,
            category: sanityProduct.category,
            image: sanityProduct.image,
            quantity: dbProduct!.quantity,
            price: dbProduct!.price,
            amount: dbProduct!.amount,
        }
        // push to array (local scope)
        combinedProductsArray.push(combinedProduct)
    })
    // update the main array
    return combinedProductsArray
}

export async function GET(request: NextRequest) {

    // const origin = request.headers.get('origin')

    const params = request.nextUrl.searchParams
    const paramUserId = params.get("userid")

    // console.log("User id in params is " + paramUserId)

    try {
        const uid = paramUserId as string;
        const res = await db.select().from(cartTable).where(eq(cartTable.userid, uid))

        if (res.length > 0) {
            const ids = getIdsFromDb(res)
            const sanityProducts = await getProductsFromSanity(ids)
            const combinedProducts = makeCombinedProductsArray(res, sanityProducts)

            return new NextResponse(JSON.stringify(combinedProducts),
                // {
                //     headers: {
                //         'Access-Control-Allow-Origin': origin!,
                //         'Content-Type': 'application/json',
                //     }
                // }
            )

        } else {
            return NextResponse.json(
                { message: "Cart is Empty" },
                // {
                //     headers: {
                //         'Access-Control-Allow-Origin': origin!,
                //         'Content-Type': 'application/json',
                //     }
                // }
            )

        }

    }

    catch (error) {
        return NextResponse.json(
            { message: "Something went wrong", err: error },
            { status: 500, }
        )
    }
}

// export async function GET(request: Request) {

//     const origin = request.headers.get('origin')

//     // const params = request.nextUrl.searchParams
//     // const paramUserId = params.get("userid")

//     const params = request.headers.get("origin")
//     console.log(params)

//     // console.log("User id in params is " + paramUserId)

//     return NextResponse.json({message: `params is ${params}`})

//     // try {
//     //     const uid = paramUserId as string;
//     //     const res = await db.select().from(cartTable).where(eq(cartTable.userid, uid))

//     //     if (res.length > 0) {
//     //         const ids = getIdsFromDb(res)
//     //         const sanityProducts = await getProductsFromSanity(ids)
//     //         const combinedProducts = makeCombinedProductsArray(res, sanityProducts)

//     //         return new NextResponse(JSON.stringify(combinedProducts),
//     //             {
//     //                 headers: {
//     //                     'Access-Control-Allow-Origin': origin!,
//     //                     'Content-Type': 'application/json',
//     //                 }
//     //             }
//     //         )

//     //     } else {
//     //         return NextResponse.json(
//     //             { message: "Cart is Empty" },
//     //             {
//     //                 headers: {
//     //                     'Access-Control-Allow-Origin': origin!,
//     //                     'Content-Type': 'application/json',
//     //                 }
//     //             }
//     //         )

//     //     }

//     // }

//     // catch (error) {
//     //     return NextResponse.json(
//     //         { message: "Something went wrong", err: error },
//     //         { status: 500, }
//     //     )
//     // }
// }


export async function POST(request: NextRequest) {
    const origin = request.headers.get('origin')

    const req: NewCart = await request.json();

    try {

        if (req) {

            const res = await db.insert(cartTable).values({
                userid: req.userid,
                productid: req.productid,
                quantity: req.quantity,
                price: req.price,
                amount: req.amount,
            }).returning()

            return NextResponse.json(
                { message: "Data added successfully", res },
                // {
                //     headers: {
                //         'Access-Control-Allow-Origin': origin!,
                //         'Content-Type': 'application/json',
                //     }
                // }
            )

        } else {
            return NextResponse.json(
                { message: "Data could not be inserted" },
                { status: 400 }
            )
        }

    } catch (error) {
        console.log("POST request error", error)
        return NextResponse.json(
            { err: error },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {

    const origin = request.headers.get('origin')

    const req: NewCart = await request.json();

    try {
        if (req.productid && req.userid) {

            const res = await db.update(cartTable)
                .set({ quantity: req.quantity, amount: req.amount })
                .where(and(eq(cartTable.userid, req.userid), eq(cartTable.productid, req.productid)))
                .returning()

            return NextResponse.json(
                { message: "Product updated sucessfully" },
                // {
                //     headers: {
                //         'Access-Control-Allow-Origin': origin!,
                //         'Content-Type': 'application/json',
                //     }
                // }
            )
        } else {
            return NextResponse.json(
                { message: "Product could not be updated" },
                { status: 400 }
            )
        }

    } catch (error) {
        console.log("PUT request error", error)
        return NextResponse.json(
            { err: error },
            { status: 500 }
        )
    }

}

export async function DELETE(request: NextRequest) {

    const origin = request.headers.get('origin')

    const params = request.nextUrl.searchParams
    const paramUserId = params.get("userid")
    const paramProductId = params.get("productid")

    try {
        if (paramUserId && paramUserId) {

            const uid = paramUserId as string;
            const productId = paramProductId as string

            const res = await db.delete(cartTable)
                .where(and(eq(cartTable.userid, uid), eq(cartTable.productid, productId)))
                .returning()

            return NextResponse.json(
                { message: "Product removed sucessfully" },
                // {
                //     headers: {
                //         'Access-Control-Allow-Origin': origin!,
                //         'Content-Type': 'application/json',
                //     }
                // }
            )
        } else {
            return NextResponse.json(
                { message: "Product could not be removed" },
                { status: 400 }
            )
        }
    } catch (error) {
        console.log("DELETE request error", error)
        return NextResponse.json(
            { err: error },
            { status: 500 }
        )
    }

}

export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get('origin')

    try {
        return NextResponse.json(
            { message: "Sucess" },
            // {
            //     headers: {
            //         'Access-Control-Allow-Origin': origin!,
            //         'Content-Type': 'application/json',
            //     }
            // }
        )

    } catch (error) {
        console.log("OPTIONS request error", error)
        return NextResponse.json(
            { err: error },
            { status: 500 }
        )
    }
}