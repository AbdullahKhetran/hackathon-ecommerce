import { CombinedProduct } from "@/types/products";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { urlFor } from "@/sanity/sanity-utils";

const key = process.env.STRIPE_SECRET_KEY

const stripe = new Stripe(key!, {
    apiVersion: "2023-08-16", // version suggested by vscode
});

export async function POST(request: NextRequest) {

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
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                    };
                }),


                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/cart`

            })

            return NextResponse.json({ session });
        } else {
            console.log("No Products found")
            return NextResponse.json({ message: "No Products Found" });

        }

    } catch (error) {
        console.log("Error from stripe post request", error);
        return NextResponse.json(error);
    }

}
