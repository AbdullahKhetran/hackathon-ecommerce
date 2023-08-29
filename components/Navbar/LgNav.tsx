import Link from "next/link"
import Image from "next/image"
import logo from "@/public/Logo.webp"
import { Search } from "lucide-react"
import { LgNavCartIcon } from "./CartIcon"

// This is Navbar for screen larger than small size

export default function LgNav() {
    return (
        <div className="flex justify-between items-center my-[5vh] mx-16 xl:mx-32  ">
            <Link href="/" className="">
                <Image
                    src={logo}
                    alt="Logo"
                    width={140}
                    height={35}
                // className="aspect-[140/35]"
                />
            </Link>

            <div className=" flex gap-12 text-xl">
                <Link href="/female" >Female</Link>
                <Link href="/male" >Male</Link>
                <Link href="/kids" >Kids</Link>
                <Link href="/products" >All Products</Link>
            </div>

            <div className="flex gap-2 p-1 border rounded-md w-[30%]">

                <Search size={20} strokeWidth={1} />
                <input type="type" placeholder="Search products" className="grow focus:outline-none" />
            </div>

            <div className=" ">
                <LgNavCartIcon />
            </div>
        </div>
    )
}