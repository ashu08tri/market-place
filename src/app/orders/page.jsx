"use client"
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';

const getData = async (email) => {
    try {
        let res = await fetch('/api/email_verify', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        res = await res.json();
        return res;
    } catch (err) {
        console.log(err);
    }
};

const Page = () => {
    const [formData, setFormData] = useState({ email: '' });
    const [orderData, setOrderData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getData(formData.email);
        if (data.ok === false) {
            toast.error(data.message);
        } else {
            // Group orders by email
            const groupedOrders = data.reduce((acc, order) => {
                const { email } = order;
                if (!acc[email]) {
                    acc[email] = { ...order, products: [] };
                }
                acc[email].products = acc[email].products.concat(order.products);
                return acc;
            }, {});

            setOrderData(Object.values(groupedOrders));
        }
    };

    return (
        <div className="pt-24">
            <Toaster closeButton />
            {orderData ? (
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Order Data</h1>
                    <ul className="space-y-4">
                        {orderData.map((order) => {
                            // Format the date here
                            const formattedDate = new Intl.DateTimeFormat('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            }).format(new Date(order.createdAt));

                            return (
                                <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-md px-10">
                                    <div className='flex justify-between'>
                                        <div className="mb-2">
                                            <strong className="font-semibold">Name:</strong> {order.firstName} {order.lastName}
                                        </div>
                                        <div className="mb-2">
                                            <strong className="font-semibold">Email:</strong> {order.email}
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <strong className="font-semibold">Address:</strong> {order.address}
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className="mb-2">
                                            <strong className="font-semibold">Phone No:</strong> {order.phoneNumber}
                                        </div>
                                        <div className="mb-2">
                                            <strong className="font-semibold">Ordered On:</strong> {formattedDate}
                                        </div>
                                    </div>
                                    <div>
                                        <strong className="font-semibold">Products:</strong>
                                        <ul className="ml-4 mt-2">
                                            {order.products.map((product) => (
                                                <li key={product._id} className='flex items-center'>
                                                    <img src={product.img} alt="" className='h-20 w-20' />
                                                    <div className="ml-4">
                                                        <div>{product.title}</div>
                                                        <div>{product.amount} &#x20B9;</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-20">
                    <h1 className='text-2xl font-semibold py-5'>Check for your orders.</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Fetch Order Data
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Page;
