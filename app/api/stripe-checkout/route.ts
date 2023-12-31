import { CombinedProduct } from "@/types/products";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { urlFor } from "@/sanity/sanity-utils";

const key = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(key!, {
    apiVersion: "2023-08-16", // version suggested by vscode
});

export async function POST(request: NextRequest) {

    const origin = request.headers.get('origin')

    const params = request.nextUrl.searchParams
    const paramUserId = params.get("userid")

    const products = await request.json();

    const customer = await stripe.customers.create({
        metadata: {
            userId: paramUserId,
        },
    })

    try {
        if (products.length > 0 && paramUserId) {

            const session = await stripe.checkout.sessions.create({

                customer: customer.id,

                submit_type: "pay",
                mode: 'payment',
                payment_method_types: ["card"],

                billing_address_collection: "auto",
                shipping_options: [
                    { shipping_rate: "shr_1NjlNVKUenJjDyS5cAijrv3u" }, // free one
                    { shipping_rate: "shr_1NjlOQKUenJjDyS5YK2iwIpU" }, // charged one
                ],

                line_items: products.map((product: CombinedProduct) => {

                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: product.name,
                                images: [urlFor(product.image).url()],
                            },
                            unit_amount: product.price * 100,
                        },
                        quantity: product.quantity,
                    };
                }),


                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/cart`

            })

            return NextResponse.json(
                { session },
                {
                    headers: {
                        'Access-Control-Allow-Origin': origin!,
                        'Content-Type': 'application/json',
                    }
                }
            );
        } else {
            console.log("No Products found")
            return NextResponse.json(
                { message: "No Products Found" },
                {
                    headers: {
                        'Access-Control-Allow-Origin': origin!,
                        'Content-Type': 'application/json',
                    }
                }
            );

        }

    } catch (error) {
        console.log("Error from stripe post request", error);
        return NextResponse.json(error);
    }

}

// OPTIONS request only for CORS because browser first sends a OPTIONS (prefight) request
export async function OPTIONS(request: NextRequest) {
    const origin = request.headers.get('origin')
    // console.log("origin in options request is", origin)

    try {
        return NextResponse.json(
            { message: "Sucess" },
            {
                headers: {
                    'Access-Control-Allow-Origin': origin!,
                    "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS, DELETE",
                    'Content-Type': 'application/json',
                }
            }
        )

    } catch (error) {
        console.log("OPTIONS request error", error)
        return NextResponse.json(
            { err: error },
            { status: 500 }
        )
    }
}