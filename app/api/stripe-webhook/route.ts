import Stripe from "stripe";
import { db, cartTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers"

const webHookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string


export const config = {
    api: {
        bodyParser: false,
    },
}


export async function POST(req: Request, res: any) {

    const headersList = headers();

    try {
        // const rawBody = await req.text();

        const signature = headersList.get("stripe-signature")

        const stripe = new Stripe(
            process.env.STRIPE_SECRET_KEY as string,
            {
                apiVersion: '2023-08-16',
            }
        )

        let event

        try {
            if (!signature || !webHookSecret) {
                return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
                    status: 400,
                })
            }

            // event = stripe.webhooks.constructEvent(
            //     rawBody.toString(), // Stringify the request for the Stripe library
            //     signature,
            //     webHookSecret
            // )

            // got this from docs https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/api/webhooks/route.ts
            event = stripe.webhooks.constructEvent(
                await (await req.blob()).text(),
                req.headers.get('stripe-signature') as string,
                webHookSecret
            )

        } catch (error: any) {
            console.log(`Something went wrong`, error);
            return new Response(`Something went wrong in constructing event ${error}`, {
                status: 400,
            })
        }


        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            // @ts-ignore
            const customerData = await stripe.customers.retrieve(session.customer)
            // @ts-ignore
            const userId = customerData.metadata.userId; // userid that was used to register customer

            await db.delete(cartTable).where(eq(cartTable.userid, userId));

            return new Response("Payment Confirmation Router Reciept", {
                status: 200
            });


        } else {
            res.setHeader("Allow", "POST");
        }
    } catch (error: any) {
        console.log("Error in webhook", error);
        return;
    }

}
