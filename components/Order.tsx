"use client"
import { handleAddToCart, handleChange } from "@/lib/utils"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Product } from "@/types/sanity"
import Size from "./Product/Size"
import { useState } from "react"
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addUserId, removeUserId } from "@/redux/features/authSlice";
import { addToCart, increaseQuantity } from "@/redux/features/cartSlice"
import { NewCart } from "@/lib/drizzle"
// import { MouseEvent } from "react"
import { getData } from "@/app/cart/cartData"


type Props = {
    matchingProduct: Product,
}

export function Order({ matchingProduct }: Props) {

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch<AppDispatch>()


    // User Id
    const userIdFromState = useAppSelector((state) => state.auth.uid)
    // console.log("user id from state is", userIdFromState)
    if (userIdFromState.length === 0) {
        dispatch(addUserId(uuid()))
    }
    const userId = useAppSelector((state) => state.auth.uid)
    // console.log("User id on product page", userId)

    // constructing product for add to cart
    const cartProduct: NewCart = {
        userid: userId,
        productid: matchingProduct._id,
        quantity: quantity,
        price: matchingProduct.price,
        amount: quantity * matchingProduct.price,
    }

    // call on button click
    const handleAddToCartClick = async () => {

        try {
            // get data: if product exists, PUT request else POST request
            const data = await getData(userId)

            if (Array.isArray(data)) {

                const existingProduct = data.find((item) => item.id === matchingProduct._id)

                if (existingProduct) {
                    // only updating when success data was sent and not json object

                    const newQuantity = existingProduct.quantity + quantity

                    // update database
                    await handleChange({ uid: userId, product: existingProduct, quantity: newQuantity })

                    // update state
                    dispatch(increaseQuantity(existingProduct.id))

                } else {
                    // update database
                    handleAddToCart({ product: cartProduct, quantity: quantity, uid: userId }) // updates database
                    //    update state
                    const payload = {
                        product: cartProduct,
                        quantity: quantity,
                    }
                    dispatch(addToCart(payload));

                }
            } else {
                // update database
                handleAddToCart({ product: cartProduct, quantity: quantity, uid: userId }) // updates database
                //    update state
                const payload = {
                    product: cartProduct,
                    quantity: quantity,
                }
                dispatch(addToCart(payload));

            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-10 max-w-[70%]">
            <div className=" flex flex-col gap-1">
                <h1 className="text-3xl tracking-wider text-darkGray">{matchingProduct?.name}</h1>
                <h2 className="text-2xl font-semibold text-black/50">{matchingProduct?.category}</h2>
            </div>

            <Size />


            <div className="flex gap-8 items-center">

                <h1 className="font-bold text-lg">Quantity:</h1>

                <div className='flex gap-3 items-center'>
                    <button
                        disabled={quantity === 0 ? true : false}
                        onClick={() => setQuantity(quantity - 1)}
                        className='bg-[#f1f1f1] rounded-[50%] p-1'
                    >
                        <Minus />
                    </button>

                    <h2>{quantity}</h2>

                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='border-2 border-black rounded-[50%] p-1'
                    >
                        <Plus />
                    </button>

                </div>
            </div>

            <div className="flex my-4 gap-2 max-w-[60%] lg:max-w-none">

                <button
                    onClick={handleAddToCartClick}
                    className="flex gap-2  justify-center items-center grow bg-darkGray text-white font-bold p-3 border-2 border-l-gray-600 border-t-gray-600 border-r-black border-b-black"
                >

                    <ShoppingCart size={28} />
                    <span> Add to Cart</span>
                </button>


                <h2 className="self-center text-3xl font-bold tracking-widest">{"$" + matchingProduct?.price * quantity}</h2>
            </div>
        </div>
    )
}
