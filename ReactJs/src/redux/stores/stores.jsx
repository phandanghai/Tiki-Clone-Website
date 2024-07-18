import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import stateUserReducer from '../sliders/stateSlider';
import AdminStateReducer from '../sliders/AdminStateSlider';
import userReducer from '../sliders/UserSlider';
import productReducer from '../sliders/ProductSlider';
import orderReducer from '../sliders/orderSilder';
const rootReducer = combineReducers({
   state: stateUserReducer,
   stateAdmin: AdminStateReducer,
   user: userReducer,
   products: productReducer,
   orders: orderReducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['user', 'products', 'orders'],
   blacklist: ['state'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
   reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
