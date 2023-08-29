"use client"
import Footer from "@/components/Footer/Footer"
import Copyright from "@/components/Footer/Copyright"
import Navbar from "@/components/Navbar/Navbar"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getData } from "@/app/cart/cartData"
import { useEffect, useState } from "react"
import { CombinedProduct, MyProduct } from "@/types/products";
import { MinusIcon, PlusIcon, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/sanity/sanity-utils"
import { deleteFromCart, increaseQuantity, decreaseQuantity, reset } from "@/redux/features/cartSlice"
import { handleChange } from "@/lib/utils";
import StripeCheckoutButton from "@/components/CheckoutButton";
// import { useRouter } from "next/navigation";


function EmptyCart() {
    return (
        <div className="my-18 mx-8 md:mx-16 xl:mx-32 px-4">
            <h1 className="font-bold text-xl">Shopping Cart</h1>
            <div className="flex flex-col items-center gap-4">
                <ShoppingCart size={140} />
                <h1 className="font-bold text-4xl tracking-wide">Your cart is empty</h1>
            </div>
        </div>
    )
}

export default function Home() {

    const userid = useAppSelector((state) => state.auth.uid);

    const [data, setData] = useState<CombinedProduct[]>([])

    const [refresh, setRefresh] = useState(false)

    const totalAmount = useAppSelector(state => state.cart.totalAmount)
    const totalItems = useAppSelector(state => state.cart.totalQuantity)

    const dispatch = useAppDispatch()

    // Delete request
    type DeleteProductProps = {
        uid: string,
        productId: string
    }
    async function handleDeleteFromCart({ uid, productId }: DeleteProductProps) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart?userid=${uid}&productid=${productId}`, {
            // const res = await fetch(`http://localhost:3000/api/cart?userid=${uid}&productid=${productId}`, {
            method: "DELETE",
        })
        console.log(res)
        if (!res.ok) {
            throw new Error("Could not remove product")
        }
        setRefresh(!refresh)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await getData(userid);
                // console.log(fetchedData)
                // console.log("fetched data is an array?", Array.isArray(fetchedData))

                if (Array.isArray(fetchedData)) {
                    // this check because there is possibility that res was json {message: "cart is empty"}
                    setData(fetchedData)
                }
                // console.log("set data is ", data)

            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [refresh, userid]);

    // const handleReset = () => {
    //     dispatch(reset())
    // }

    if (data.length === 0) return (
        <div className="max-w-center">
            <Navbar />

            <EmptyCart />

            <Footer />
            {/* 
            <button className="w-max p-2 bg-red-500"
                onClick={handleReset}>
                Reset State
            </button> */}

            <Copyright />
        </div>
    );

    return (
        <div className="max-w-center">
            <Navbar />

            <div className=" my-18 mx-8 md:mx-16 xl:mx-32 px-4 ">
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="flex flex-col gap-4">
                        {/* Generating Prodcut Cards */}

                        {/* {data.map((product) => (
                            <Test product={product} key={product.id} />
                        ))} */}

                        {data.map((product) => {
                            // console.log(product)
                            // const stateProduct = useAppSelector((state) => state.cart.products.find(item => item.productid === product.id))


                            // for  increasing product
                            const handlePlus = (productId: string) => () => {
                                dispatch(increaseQuantity(productId)); // updates state
                                handleChange({ uid: userid, product: product, quantity: product.quantity + 1 }) // updates database
                                setRefresh(!refresh) // updates ui
                            };

                            // for decreasing product
                            const handleMinus = (productId: string) => () => {
                                dispatch(decreaseQuantity(productId)); // updates state
                                handleChange({ uid: userid, product: product, quantity: product.quantity - 1 }) // updates database
                                setRefresh(!refresh) // updates ui    
                            };

                            // for removing product
                            const handleDelete = (userid: string, productId: string) => () => {
                                dispatch(deleteFromCart(productId)); // updates state
                                handleDeleteFromCart({ uid: userid, productId: productId }) // updates database                                
                            }
                            return (
                                <div key={product.id} className="flex flex-col md:flex-row gap-8 mt-8">

                                    <Image
                                        src={urlFor(product.image).url()}
                                        alt="Product image"
                                        width={240}
                                        height={240}
                                        className="rounded-3xl"
                                    />
                                    <div className="flex justify-between grow">
                                        <div className="flex flex-col justify-between gap-[6px] text-lg">
                                            <h1 className="text-darkGray text-2xl font-light">{product.name}</h1>
                                            <h2 className="text-productSubtitle text-base font-semibold">{product.category}</h2>
                                            <h2 className="text-darkGray font-semibold">Delivery Estimation</h2>
                                            <p className="text-yellow-400 font-semibold">5 Working Days</p>
                                            <h2 className="text-darkGray font-bold tracking-wide">${product.amount}</h2>
                                        </div>

                                        <div className="flex flex-col justify-between items-end">

                                            <button onClick={handleDelete(userid, product.id)}>
                                                <Trash2 />
                                            </button>

                                            <div>
                                                <div className='flex gap-3 items-center'>
                                                    <button
                                                        onClick={handleMinus(product.id)}
                                                        disabled={product.quantity > 1 ? false : true}
                                                        className='bg-[#f1f1f1] rounded-full p-1'>
                                                        <MinusIcon size={16} />
                                                    </button>

                                                    <h2>{product.quantity}</h2>

                                                    <button
                                                        onClick={handlePlus(product.id)}
                                                        className='border-2 border-black rounded-full p-1'>
                                                        <PlusIcon size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>

                    <div className="flex flex-col gap-8 p-8 bg-[#fbfcff] grow">
                        <h1 className="text-xl font-bold ">Order Summary</h1>
                        <div className="flex justify-between">
                            <h2>Quantity </h2>
                            <h2>{totalItems}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h2>Sub Total</h2>
                            <h2>{totalAmount}</h2>
                        </div>
                        <StripeCheckoutButton products={data} />
                    </div>
                </div>
            </div>

            <Footer />
            {/* <button className="w-max p-2 bg-red-500"
                onClick={handleReset}>
                Reset State
            </button> */}
            <Copyright />
        </div>
    )

}

// i also have this option which will update the ui based on state but then i cant refresh the page using setrefresh(!refresh)
// type Prop = {
//     product: CombinedProduct,
// }

// function Test({ product }: Prop) {
//     const [quantity, setQuantity] = useState(product.quantity)

//     const increment = () => {
//         setQuantity(quantity + 1)
//     }
//     return (
//         <div>
//             <h1>Name: {product.name}</h1>
//             <h2>Quantity: {quantity}</h2>
//             <button onClick={increment}>increase quantity</button>
//         </div>
//     )
// }