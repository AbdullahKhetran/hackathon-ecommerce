import Link from "next/link";
import Image from "next/image";
import logo from "@/public/Logo.webp"
import { AlignJustify } from "lucide-react";

type Props = {
    onShow: () => void
}

export default function CloseMenu({ onShow }: Props) {

    return (
        <div className="flex justify-between">
            <Link href="/">
                <Image
                    src={logo}
                    alt="Logo"
                    width={140}
                    height={35}
                />
            </Link>

            <button onClick={onShow} >
                <AlignJustify size={38} />
            </button>
        </div>
    )
}
