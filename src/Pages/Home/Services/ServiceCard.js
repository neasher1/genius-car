import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const ServiceCard = ({ service }) => {

    const { title, img, price } = service;

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-xl font-semibold text-orange-600'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <button>
                        <FaArrowRight></FaArrowRight>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;