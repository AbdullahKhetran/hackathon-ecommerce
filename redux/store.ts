import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice"
import authReducer from "./features/authSlice"
import { persistReducer, persistStore } from "redux-persist";
// import storage from "./utils";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    // timeout: 1000, // default is 5000 : 5 seconds
    key: "root",
    storage
}

const combinedReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
})


const persistedReducer = persistReducer(persistConfig, combinedReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
    devTools: true
})

export const persistor = persistStore(store)


// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch