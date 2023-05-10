import React from 'react';
import Order from './order';

const OrdersList = (props) => {
    const { orders } = props;
    if (!props || !props.orders || !props.orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    return orders.map(order => {
        return <Order key={order._id} order={order} />});
}

export default OrdersList;