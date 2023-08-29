"use client"
import Link from "next/link"
import Image from "next/image";
import logo from "@/public/Logo.webp"
import { useEffect } from "react";
import { X, ShoppingCart } from 'lucide-react';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";


type Props = {
    onShow: VoidFunction
}


export default function OpenMenu({ onShow }: Props) {
    // by chatgpt to disable scrolling when this component mounts
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const userid = useAppSelector((state) => state.auth.uid)
    // console.log(userid)

    const totalQuantity = useAppSelector((state) => state.cart.totalQuantity)
    console.log("openmenu: total quantity", totalQuantity)



    return (
        <div className="flex flex-col p-8 fixed top-0 left-0  w-full h-full bg-white">
            <div className="flex justify-between">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={140}
                        height={35}
                    />
                </Link>

                <button onClick={onShow}>
                    <X size={38} />
                </button>
            </div>

            <div className="flex flex-col grow justify-center gap-5 items-center text-lg">

                {/* Cart Icon */}
                <Link href={`/cart?userid=${userid}`} className="flex flex-col relative items-end py-2 px-4 bg-socialIconbg rounded-[50%] w-max">
                    <span className="bg-[#f02d34] rounded-[50%] w-6 h-6 text-[#eee] text-center font-semibold">{totalQuantity}</span>
                    <ShoppingCart size={32} />
                </Link>


                <Link href="/female">Female</Link>
                <Link href="/male">Male</Link>
                <Link href="/kids">Kids</Link>
                <Link href="/products">All Products</Link>
            </div>
        </div>
    )
}

