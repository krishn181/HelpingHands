// import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
// import thunk from 'redux-thunk';  
// import { authReducer } from '../Auth/Reducer';

// // Combine your reducers here
// const rootReducers = combineReducers({
//     auth: authReducer
// });

// export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));// store.js
import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // This is correct for v3.x
import { authReducer } from '../Auth/Reducer';
import { customerProductReducer} from './Product/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
// Combine your reducers
const rootReducers = combineReducers({
    auth: authReducer,
    product: customerProductReducer ,
    cart:cartReducer,
    order:orderReducer,
    
});

// Redux Thunk v3.x requires using applyMiddleware
export const store = legacy_createStore(
    rootReducers,
    applyMiddleware(thunk) // Use thunk directly inside applyMiddleware
);