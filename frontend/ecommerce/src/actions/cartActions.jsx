import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/product/${id}/`
);

  console.log("URL PRODUCT ID:", id);
  console.log("PRODUCT API DATA:", data);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: Number(id),
      name: data.productname,
      image: data.image,
      price: data.price,
      stockcount: data.stockcount,
      qty: qty,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};