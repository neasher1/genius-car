import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, phone, price, serviceName, customer, service, status } = order;

    const [orderService, setOrderService] = useState({});

    useEffect(() => {

        fetch(`https://genius-car-server-five-lime.vercel.app/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
            .catch(error => console.log(error))

    }, [service])
    // console.log(orderService);


    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {
                                orderService?.img &&
                                <img src={orderService.img} alt="" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
            </td>
            <td>$ {price}</td>
            <th>
                <button onClick={() => handleStatusUpdate(_id)} className='btn btn-ghost btn-xs'>{status ? status : "PENDING"}</button>
            </th>
        </tr>
    );
};

export default OrderRow;