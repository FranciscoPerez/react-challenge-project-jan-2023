import { SERVER_IP } from "../../private";
import { ADD_ORDER, EDIT_ORDER, DELETE_ORDER, GET_ORDERS } from "./types";
import axios from 'axios';

// declare api url variables
const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;
const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;
const GET_ORDERS_URL = `${SERVER_IP}/api/current-orders`;

export const addOrder = (order) => {
  return (dispatch) => {
    axios.post(ADD_ORDER_URL, {
      order_item: order.order_item,
      quantity: order.quantity,
      ordered_by: order.ordered_by,
    })
    .then(({data: response}) => {
      console.log("Success", JSON.stringify(response));
      dispatch({
        type: ADD_ORDER,
        payload: {
          order: {
            ...order,
            _id: response.insertedId,
          },
        },
      });
    })
    .catch((error) => console.error(error));
  };
};

export const editOrder = (order) => {
  return (dispatch) => {
    axios.post(EDIT_ORDER_URL, {
      id: order.id,
      order_item: order.order_item,
      quantity: order.quantity,
      ordered_by: order.ordered_by,
    })
    .then(({data: response}) => {
      console.log("Success", JSON.stringify(response));
      dispatch({ type: EDIT_ORDER, payload: { order } });
    })
    .catch((error) => console.error(error));
  };
};

export const deleteOrder = (id) => {
  return (dispatch) => {
    axios.post(DELETE_ORDER_URL, {id})
      .then(({data: response}) => {
        console.log("Success", JSON.stringify(response));
        dispatch({ type: DELETE_ORDER, payload: { id } });
      })
      .catch((error) => console.error(error));
  };
};

export const getOrders = (order) => {
  return (dispatch) => {

    axios.get(GET_ORDERS_URL)
      .then(({data: response}) => {
        if (response.success) {
          dispatch({ type: GET_ORDERS, payload: { orders: response.orders } });
        } else {
          console.log("Error getting orders");
        }
      })
  };
};
