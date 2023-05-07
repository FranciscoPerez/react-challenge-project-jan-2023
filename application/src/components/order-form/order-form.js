import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './orderForm.css';
import { ItemDescrSelect, ItemQntSelect } from '../lib/selectInputs';

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;

export default function OrderForm(props) {
    const [orderItem, setOrderItem] = useState("");
    const [quantity, setQuantity] = useState("1");

    const menuItemChosen = (event) => setOrderItem(event.target.value);
    const menuQuantityChosen = (event) => setQuantity(event.target.value);

    const auth = useSelector((state) => state.auth);

    const submitOrder = () => {
        if (orderItem === "") return;
        fetch(ADD_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                order_item: orderItem,
                quantity,
                ordered_by: auth.email || 'Unknown!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    return (
        <Template>
            <div className="form-wrapper">
                <form>
                    <label className="form-label">I'd like to order...</label><br />
                    <ItemDescrSelect value={orderItem} 
                        onChangeHandler={(event) => menuItemChosen(event)}
                        className="menu-select"/>
                    <br />
                    <label className="qty-label">Qty:</label>
                    <ItemQntSelect value={orderItem} 
                        onChangeHandler={(event) => menuQuantityChosen(event)}/>
                    <br />
                    <button type="button" className="order-btn" onClick={() => submitOrder()}>Order It!</button>
                </form>
            </div>
        </Template>
    )
}