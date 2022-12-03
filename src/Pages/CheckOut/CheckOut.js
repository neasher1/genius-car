import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    const { user } = useContext(AuthContext);

    const service = useLoaderData();
    const { _id, title, price } = service;

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            phone,
            email,
            message,
        }

        fetch('https://genius-car-server-five-lime.vercel.app/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    alert("Order Placed Successfully");
                    form.reset();
                }
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <div className='my-24'>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3 className="text-3xl">Confirm Order About: <span className='text-orange-600'>{title}</span></h3>
                    <h3 className="text-2xl">Price: ${price}</h3>
                </div>
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2 my-8'>
                    <input type="text" name='firstName' placeholder="First Name" className="input input-bordered w-full" />
                    <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered w-full" />
                    <input type="text" name='phone' placeholder="Your Phn" className="input input-bordered w-full" />
                    <input type="text" name='email' defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full" readOnly />
                    <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>
                </div>
                <input className='btn btn-active w-full' type="submit" value="Confirm Order" />
            </form>
        </div>
    );
};

export default CheckOut;