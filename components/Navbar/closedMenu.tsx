"use client"

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Logo.webp"
import { AlignJustify, Search } from "lucide-react";
import SmSearchBar from "@/components/Navbar/smSearchBar";
import { useState } from "react";

type Props = {
    onShow: () => void
}

export default function CloseMenu({ onShow }: Props) {
    const [showSearchBar, setShowSearchBar] = useState(false)

    function changeState() {
        setShowSearchBar(!showSearchBar)
    }

    return (
        <div className="flex justify-between items-center">

            <button onClick={onShow} >
                <AlignJustify size={38} />
            </button>

            <Link href="/">
                <Image
                    src={logo}
                    alt="Logo"
                    width={140}
                    height={35}
                />
            </Link>

            <button onClick={() => setShowSearchBar(!showSearchBar)}>
                <Search size={28} />
            </button>
            {showSearchBar && <SmSearchBar fn={changeState} />}
        </div>
    )
}
