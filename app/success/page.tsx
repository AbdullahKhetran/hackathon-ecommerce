import Copyright from "@/components/Footer/Copyright";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { CheckCircle } from 'lucide-react';
import Link from "next/link";

export default function Sucess() {
    return (
        <div className="max-w-center">
            <Navbar />

            <div className="flex flex-col items-center py-16 px-8 gap-6 bg-socialIconbg my-8 mx-8 md:mx-16 rounded-xl">
                <div className="flex flex-col gap-4 items-center text-center">
                    <CheckCircle size={120} color="green  " />
                    <h1 className="text-5xl font-bold">Thank you for your order!</h1>
                    <p>Check your email inbox for the receipt</p>
                </div>

                <p className="text-lg text-center">If you have any questions, please email <a href="mailto:dinemarket@example.com" className="text-red-600">dinemarket@example.com</a> </p>

                <Link href={"/products"}>

                    <button className="rounded bg-neutral-800 text-white p-2 px-8 text-lg">Continue Shopping</button>
                </Link>
            </div>

            <Footer />
            <Copyright />
        </div>
    )
}
