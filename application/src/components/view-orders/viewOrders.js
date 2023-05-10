import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';


const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;
const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setOrders(response.orders);
                } else {
                    console.log('Error getting orders');
                }
            });
    }, [])

    const onEditOrderHandler = (orderData) => {
        fetch(EDIT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: orderData.id,
                order_item: orderData.order_item,
                quantity: orderData.quantity,
                ordered_by: orderData.ordered_by,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log("Success", JSON.stringify(response));
            setOrders((state) => {
                const newOrders = [...state];
                const orderIndex = newOrders.findIndex(o => o._id == orderData.id);
                if(orderIndex >= 0){
                    newOrders[orderIndex].order_item = orderData.order_item;
                    newOrders[orderIndex].quantity = orderData.quantity;
                }
                return newOrders;
            });
            
        })
        .catch(error => console.error(error));
    }

    const onDeleteOrderHandler = (id) => {
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            setOrders(state => state.filter(o => o._id != id));
            console.log("Success", JSON.stringify(response))})
        .catch(error => console.error(error));
    }

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                    onEditOrder={onEditOrderHandler}
                    onDeleteOrder={onDeleteOrderHandler}
                />
            </div>
        </Template>
    );
}