import { Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

export const getStripePromise = () => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    console.log("key type is ", typeof key)
    if (!stripePromise && key) {
        stripePromise = loadStripe(key);
    }
    return stripePromise;
};
