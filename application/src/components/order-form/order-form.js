import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Template } from '../../components';
import './orderForm.css';
import { ItemDescrSelect, ItemQntSelect } from '../lib/selectInputs';
import { addOrder } from '../../redux/actions/orderActions';


export default function OrderForm(props) {
    const [orderItem, setOrderItem] = useState("");
    const [quantity, setQuantity] = useState("1");

    const menuItemChosen = (event) => setOrderItem(event.target.value);
    const menuQuantityChosen = (event) => setQuantity(event.target.value);

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const submitOrder = () => {
        if (orderItem === "") return;
        dispatch(addOrder({
            order_item: orderItem,
            quantity,
            ordered_by: auth.email || 'Unknown!',
        }));
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
                    <ItemQntSelect value={quantity} 
                        onChangeHandler={(event) => menuQuantityChosen(event)}/>
                    <br />
                    <button type="button" className="order-btn" onClick={() => submitOrder()}>Order It!</button>
                </form>
            </div>
        </Template>
    )
}