import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";

import {
  productDetailsReducer,
  productsListReducer,
} from "./reducers/productsReducers.jsx";

import {
  userLoginReducers,
  userSignupReducers,
  userProfileReducers,
} from "./reducers/userReducers.jsx";

import { cartReducer } from "./reducers/cartreducers.jsx";


const reducer = combineReducers({
  productsList: productsListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  userProfile: userProfileReducers,
  cart: cartReducer,
});


const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },

  cart: {
    cartItems: cartItemsFromStorage,
  },
};


const middleware = [thunk];


const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middleware))
);


export default store;