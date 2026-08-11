import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/authApi';
import authReducer from './authSlice';
import { productApi } from '@/lib/api/productApi';
import { orderApi } from '@/lib/api/orderApi';
import { customerApi } from '@/lib/api/customerApi';
import cartReducer from './cartSlice.js';
import { categoryApi } from '@/lib/api/categoryApi';
import { affiliateApi } from '@/lib/api/affiliateApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [affiliateApi.reducerPath]: affiliateApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, customerApi.middleware, orderApi.middleware,categoryApi.middleware, affiliateApi.middleware, ),
});

export default store