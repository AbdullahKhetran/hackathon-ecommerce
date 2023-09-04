import Stripe from "stripe";
import { db, cartTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers"

const webHookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
export async function POST(req: any, res: any) {

    const headersList = headers();

    try {
        const rawBody = await req.text();
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

            event = stripe.webhooks.constructEvent(
                rawBody.toString(), // Stringify the request for the Stripe library
                signature,
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

            // console.log("Payment Sucessful", session);
            // @ts-ignore
            // const line_Items = await stripe.checkout.sessions.listLineItems(event.data.object!.id);

            return new Response("Payment Confirmation Router Reciept", {
                status: 200
            });


        } else {
            res.setHeader("Allow", "POST");
            // res.status(405).end("Method Not Allowed");
        }
    } catch (error: any) {
        console.log("Error in webhook", error);
        // res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

}