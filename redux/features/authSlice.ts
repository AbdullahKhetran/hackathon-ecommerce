import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type AuthState = {
    uid: string
}

const initialState: AuthState = {
    uid: ""
}

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        removeUserId: () => {
            return initialState
        },

        addUserId: (state, action: PayloadAction<string>) => {
            return {
                uid: action.payload
            }
        },

    }

})

export const { removeUserId, addUserId } = auth.actions
export default auth.reducer