import Image from "next/image";
import logo from "@/public/Logo.webp"
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";


export default function Footer() {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr,1fr] gap-8 py-16 mx-8 md:mx-16 xl:mx-32">
            {/* logo, detail, icons */}
            <div className="flex flex-col gap-8 justify-between">
                <Image
                    src={logo}
                    alt="Logo"
                    width={240}
                    height={400}
                />
                <p className="text-xl text-gray-600 w-[60%]">Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>

                {/* style icons, bodies should be filled and size */}
                <div className="flex gap-4">
                    <Link href="#" className="bg-socialIconbg p-2 rounded-lg">
                        <Twitter size={30} />
                    </Link>
                    <Link href="#" className="bg-socialIconbg p-2 rounded-lg">
                        <Facebook size={30} />
                    </Link>
                    <Link href="#" className="bg-socialIconbg p-2 rounded-lg">
                        <Linkedin size={30} />
                    </Link>

                </div>
            </div>

            {/* Links */}

            {/* Contact */}
            <div className="flex flex-col text-neutral-500 text-xl gap-5">
                {/* overriding text size in h1 */}
                <h1 className="font-bold text-2xl mb-1">Company</h1>
                <Link href="#" className="w-max">About</Link>
                <Link href="#" className="w-max">Terms of Use</Link>
                <Link href="#" className="w-max">Privacy Policy</Link>
                <Link href="#" className="w-max">How it Works</Link>
                <Link href="#" className="w-max">Contact Us</Link>
            </div>
            {/* Support */}
            <div className="flex flex-col text-neutral-500 text-xl gap-5">
                <h1 className="font-bold text-2xl mb-1">Support</h1>
                <Link href="#" className="w-max">Support Carrer</Link>
                <Link href="#" className="w-max">24h Service</Link>
                <Link href="#" className="w-max">Quick Chat</Link>
            </div>
            {/* Contact */}
            <div className="flex flex-col text-neutral-500 text-xl gap-5">
                <h1 className="font-bold text-2xl mb-1">Contact</h1>
                <Link href="#" className="w-max">Whatsapp</Link>
                <Link href="#" className="w-max">Support 24h</Link>
            </div>

        </div>
    )
}