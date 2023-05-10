import React, { useEffect } from 'react';
import { Template } from '../../components';
import OrdersList from './ordersList';
import './viewOrders.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions/orderActions';

export default function ViewOrders(props) {
    const dispatch = useDispatch();
    const order = useSelector(state=>state.order);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch, getOrders])
    console.log(order);
    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={order.orders}
                />
            </div>
        </Template>
    );
}