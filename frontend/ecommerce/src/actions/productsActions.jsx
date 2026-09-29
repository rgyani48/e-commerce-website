import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productsConstants";

export const listProducts = () => async (dispatch) => {
  try {
    console.log("VITE API URL:", import.meta.env.VITE_API_URL);

    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/`,
    );

    console.log("PRODUCT API RESPONSE:", data);
    console.log("IS ARRAY:", Array.isArray(data));

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: Array.isArray(data)
        ? data
        : data.results || data.products || [],
    });
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);

    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/product/${id}/`,
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};