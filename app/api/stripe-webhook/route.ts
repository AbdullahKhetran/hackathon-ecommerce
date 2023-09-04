// import Stripe from "stripe";
// import { db, cartTable } from "@/lib/drizzle";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";


// export async function POST(req: Request, res: any) {

//     const webHookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string

//     try {

//         const stripe = new Stripe(
//             process.env.STRIPE_SECRET_KEY as string,
//             {
//                 apiVersion: '2023-08-16',
//             }
//         )

//         let event: Stripe.Event

//         try {

//             // got this from docs https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/api/webhooks/route.ts
//             event = stripe.webhooks.constructEvent(
//                 await (await req.blob()).text(),
//                 req.headers.get('stripe-signature') as string,
//                 webHookSecret
//             )

//         } catch (err) {
//             const errorMessage = err instanceof Error ? err.message : 'Unknown error'
//             // On error, log and return the error message.
//             if (err! instanceof Error) console.log(err)
//             console.log(`❌ Error message: ${errorMessage}`)
//             return NextResponse.json(
//                 { message: `Webhook Error: ${errorMessage}` },
//                 { status: 400 }
//             )
//         }


//         if (event.type === "checkout.session.completed") {
//             const session = event.data.object;
//             // @ts-ignore
//             const customerData = await stripe.customers.retrieve(session.customer)
//             // @ts-ignore
//             const userId = customerData.metadata.userId; // userid that was used to register customer

//             await db.delete(cartTable).where(eq(cartTable.userid, userId));

//             return NextResponse.json(
//                 { message: "Payment Confirmation Router Reciept" },
//                 { status: 200 }
//             );


//         } else {
//             res.setHeader("Allow", "POST");
//         }
//     } catch (error) {
//         console.log("Error in webhook", error);
//         return;
//     }

// }









import Stripe from "stripe";
import { db, cartTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers"


export async function POST(req: any, res: any) {

    const headerslist = headers();


    const webHookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string

    try {

        // const requestBuffer = await buffer(req)
        // const rawBody = requestBuffer.toString()

        const rawBody = await req.arrayBuffer();
        const body = Buffer.from(rawBody).toString("utf8");


        // const rawBody = await req.text();
        const signature = headerslist.get("stripe-signature")

        const stripe = new Stripe(
            process.env.STRIPE_SECRET_KEY as string,
            { apiVersion: '2023-08-16', }
        )

        let event: Stripe.Event

        try {

            // got this from docs https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/api/webhooks/route.ts
            event = stripe.webhooks.constructEvent(
                body,
                signature!,
                webHookSecret
            )

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
        return;
    }

}


