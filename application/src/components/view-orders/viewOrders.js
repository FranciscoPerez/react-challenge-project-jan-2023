import React, { useState, useEffect } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import OrdersList from './ordersList';
import './viewOrders.css';

const TIMER = 2; // seconds;
const DELAY = 200 // milliseconds

export default function ViewOrders(props) {
    const [orders, setOrders] = useState([]);

    const startLiveService = () => {
        fetch(`${SERVER_IP}/api/live-mode`, {
            method: 'POST',
            body: JSON.stringify({
                timer: TIMER
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    console.log(response);
                } else {
                    console.log('Error starting live mode');
                }
            });
    }

    const fetchOrders = () => {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    setOrders(response.orders);
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    // execute live service when component is mounted
    useEffect(() => {

        // fetch initial orders in database.
        fetchOrders();

        // start randomized live service.
        startLiveService();

        // create fetch interval and add slight delay to account for db processing.
        const interval = setInterval(fetchOrders, (TIMER * 1000) + DELAY);

        // clean up function will clear the fetch call interval when we navigate away from this page
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList
                    orders={orders}
                />
            </div>
        </Template>
    );
}