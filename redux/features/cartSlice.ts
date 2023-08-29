import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewCart } from "@/lib/drizzle"

interface CartState {
    products: Array<NewCart>,
    totalQuantity: number,
    totalAmount: number,
}

const initialState: CartState = {
    products: [],
    totalQuantity: 0,
    totalAmount: 0,
}

/* Updates that should happen
Cart
    total amount
    total quantity
Product
    quantity
    price
 */

export const cartSlice = createSlice({
    name: "cart",
    initialState, // initialState: initialState
    reducers: {

        addToCart(state, action: PayloadAction<{ product: NewCart, quantity: number }>) {

            const ap = action.payload

            const existingProduct = state.products.find((product) => product.productid === ap.product.productid)

            const amount = ap.product.price * ap.quantity

            // cart
            state.totalAmount += amount
            state.totalQuantity += ap.quantity

            // product
            if (existingProduct) {
                const amountToAdd = ap.product.price * ap.quantity

                existingProduct.amount += amountToAdd
                existingProduct.quantity += ap.quantity
            } else {
                state.products.push(ap.product)
            }
        },

        increaseQuantity(state, action: PayloadAction<string>) {

            const ap = action.payload;

            const existingProduct = state.products.find((product) => product.productid === ap)

            // cart
            state.totalQuantity++;
            state.totalAmount += existingProduct?.price!

            // product
            if (existingProduct !== undefined) {

                existingProduct.quantity++;
                existingProduct.amount += existingProduct.price

            } else {
                console.error("Existing Product is undefined")
            }
        },

        decreaseQuantity(state, action: PayloadAction<string>) {

            const ap = action.payload;

            const existingProduct = state.products.find((product) => product.productid === ap)

            // cart
            state.totalQuantity--;
            state.totalAmount -= existingProduct?.price!

            // product
            if (existingProduct !== undefined) {

                if (existingProduct.quantity === 1) {
                    state.products = state.products.filter((product) => product.productid !== existingProduct.productid)
                } else {
                    existingProduct.quantity--;
                    existingProduct.amount -= existingProduct.price
                }
            } else {
                console.error("Existing Product is undefined")
            }
        },

        deleteFromCart(state, action: PayloadAction<string>) {
            const ap = action.payload;

            const existingProduct = state.products.find((product) => product.productid === ap)

            // cart
            if (existingProduct !== undefined) {
                state.totalAmount -= existingProduct?.amount
                state.totalQuantity -= existingProduct?.quantity

            } else {
                console.error("Existing Product is undefined")
            }

            // product
            state.products.filter((product) => product.productid !== ap)
        },
        reset: state => {
            state.products = []
            state.totalQuantity = 0;
            state.totalAmount = 0
        }
    }
})

export const { addToCart, decreaseQuantity, increaseQuantity, deleteFromCart, reset } = cartSlice.actions

export default cartSlice.reducer
