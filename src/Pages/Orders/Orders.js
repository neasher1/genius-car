import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetch(`https://genius-car-server-five-lime.vercel.app/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(error => console.log(error))

    }, [user?.email])

    const handleDelete = id => {
        const proceed = window.confirm("Are you sure that you want to cancel this item?");
        if (proceed) {
            fetch(`https://genius-car-server-five-lime.vercel.app/orders/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    alert("successfully deleted");
                    const remaining = orders.filter(ordr => ordr._id !== id);
                    setOrders(remaining);
                })
                .catch(error => console.log(error))
        }
    }

    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-five-lime.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "APPROVED" })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id);
                    approving.status = "APPROVED";

                    const newOrders = [approving, ...remaining];
                    setOrders(newOrders);
                }
            })
            .catch(error => console.log(error))
    }


    return (
        <div className='my-24'>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;