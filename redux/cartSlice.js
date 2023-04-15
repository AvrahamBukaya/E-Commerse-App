import { createSlice } from '@reduxjs/toolkit'
import Product from './../components/Product';

const initialState = {
    products: [],
    totalProducts: 0,
    totalPrice: 0,

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const exist_p = state.products.some(p => p.id === action.payload.id);
            if (exist_p) {
                const index = state.products?.findIndex(p => p.id === action.payload.id);
                const temp = state.products[index];
                state.products[index].qnt = temp.qnt + action.payload.qnt;

            } else {
                state.products.push(action.payload);
            }
            state.totalProducts = state.products.reduce((total, p) => total + p.qnt, 0);
            console.log(state.products);

        },
        remove: (state, action) => {
            const index = state.products?.findIndex(p => p.id === action.payload);
            if (index !== -1) {
                state.products.splice(index, 1);
                state.totalProducts = state.products?.reduce((total, p) => ((total - p?.qnt) > 0) ? total - p?.qnt : (total - p?.qnt) * -1, 0);
                state.totalPrice = state.products?.reduce((total, p) => total + (p?.price * p?.qnt), 0);
            }

        },

    },
})

// Action creators are generated for each case reducer function
export const { add, remove } = cartSlice.actions

export default cartSlice.reducer;