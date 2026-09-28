import axios from "axios";

export const createOrder = (orderItems) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/orders/",
      {
        items: orderItems,
      },
      config
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error:
        error.response?.data?.detail ||
        error.message,
    };
  }
};


export const listOrders = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "/api/orders/",
      config
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(
      "GET ORDERS ERROR:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error:
        error.response?.data?.detail ||
        error.message,
    };
  }
};


export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/cancel/`,
      {},
      config
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(
      "CANCEL ORDER ERROR:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error:
        error.response?.data?.detail ||
        error.message,
    };
  }
};