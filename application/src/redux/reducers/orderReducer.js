import {
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  GET_ORDERS,
} from "../actions/types";

const INITIAL_STATE = { orders: [] };

export default (state = INITIAL_STATE, action) => {
  let orders;
  switch (action.type) {
    case ADD_ORDER:
      orders = [...state.orders];
      orders.push(action.payload.order);
      console.log('add_order', orders);
      return { orders };

    case EDIT_ORDER:
      orders = [...state.orders];
      const orderIndex = orders.findIndex(
        (o) => o._id == action.payload.order.id
      );
      if (orderIndex >= 0) {
        orders[orderIndex].order_item = action.payload.order.order_item;
        orders[orderIndex].quantity = action.payload.order.quantity;
      }
      return { orders };

    case DELETE_ORDER:
      orders = state.orders.filter((o) => o._id != action.payload.id)
      return {orders};

    case GET_ORDERS:
      return { orders: [...action.payload.orders] };

    default:
      return state;
  }
};


