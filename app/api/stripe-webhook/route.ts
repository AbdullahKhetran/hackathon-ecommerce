import Stripe from "stripe";
import { db, cartTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers"


export async function POST(req: Request, res: any) {

    const headerslist = headers();

    const webHookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string

    try {
        // This also works
        // const rawBody = await req.arrayBuffer();
        // const body = Buffer.from(rawBody).toString("utf8");

        const rawBody = await req.text();
        const body = rawBody.toString()
        const signature = headerslist.get("stripe-signature") as string

        const stripe = new Stripe(
            process.env.STRIPE_SECRET_KEY as string,
            { apiVersion: '2023-08-16', }
        )

        let event: Stripe.Event

        try {

            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webHookSecret
            )

            // got this from docs https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/api/webhooks/route.ts
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error'
            // On error, log and return the error message.
            if (err! instanceof Error) console.log(err)
            console.log(`❌ Error message: ${errorMessage}`)
            return NextResponse.json(
                { message: `Webhook Error: ${errorMessage}` },
                { status: 400 }
            )
        }


        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            // @ts-ignore
            const customerData = await stripe.customers.retrieve(session.customer)
            // @ts-ignore
            const userId = customerData.metadata.userId; // userid that was used to register customer

            await db.delete(cartTable).where(eq(cartTable.userid, userId));

            return NextResponse.json(
                { message: "Payment Confirmation Router Reciept" },
                { status: 200 }
            );


        } else {
            res.setHeader("Allow", "POST");
        }
    } catch (error) {
        console.log("Error in webhook", error);
        return NextResponse.json(
            { message: 'Webhook handler failed' },
            { status: 500 }
        )
    }
}


