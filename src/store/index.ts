import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slices here as they are created
// import cartReducer from '../features/cart/cartSlice';
// import productReducer from '../features/product/productSlice';
// import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here as they are created
    // cart: cartReducer,
    // products: productReducer,
    // user: userReducer,
  },
  devTools: import.meta.env.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 