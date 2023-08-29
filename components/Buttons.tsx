import Link from "next/link"

type ButtonParams = {
    content: string,
    path: string
    disabled?: boolean
}

export default function Button({ content, path, disabled = false }: ButtonParams) {
    return (
        <div>
            <Link href={path}>
                <button className="bg-darkGray text-white font-bold p-3 border-2 border-l-gray-600 border-t-gray-600 border-r-black border-b-black" disabled={disabled}>
                    {content}
                </button>
            </Link>
        </div>
    )
}

