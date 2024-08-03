"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { decode } from 'jsonwebtoken';
import { useSession } from 'next-auth/react';

const getData = async (email, isAdmin, filter) => {
    try {
        const res = await fetch('/api/email_verify', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, isAdmin, filter }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const getFilterOptions = async () => {
    try {
        const res = await fetch('/api/email_verify');
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const Page = () => {
    const [formData, setFormData] = useState({ email: '' });
    const [orderData, setOrderData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [token, setToken] = useState(null);
    const [filterOptions, setFilterOptions] = useState({ emails: [], dates: [] });
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const { data } = useSession();

    useEffect(() => {
        if (data) {
            setToken(data.user.accessToken);
        }
    }, [data]);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAdmin(decodedToken.isAdmin);
                    setUserEmail(decodedToken.email);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            setIsAdmin(false);
        }
    }, [token]);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            const options = await getFilterOptions();
            setFilterOptions(options);
        };
        fetchFilterOptions();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userEmail) {
                const data = await getData(userEmail, isAdmin, { email: selectedEmail, date: selectedDate });
                if (data.ok === false) {
                    toast.error(data.message);
                } else {
                    const groupedOrders = data.reduce((acc, order) => {
                        const { email } = order;
                        if (!acc[email]) {
                            acc[email] = { ...order, products: [] };
                        }
                        acc[email].products = acc[email].products.concat(order.products.map(product => ({ ...product, createdAt: order.createdAt })));
                        return acc;
                    }, {});
                    setOrderData(Object.values(groupedOrders));
                }
            }
        };
        fetchData();
    }, [userEmail, isAdmin, selectedEmail, selectedDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getData(formData.email, isAdmin, { email: selectedEmail, date: selectedDate });
        if (data.ok === false) {
            toast.error(data.message);
        } else {
            const groupedOrders = data.reduce((acc, order) => {
                const { email } = order;
                if (!acc[email]) {
                    acc[email] = { ...order, products: [] };
                }
                acc[email].products = acc[email].products.concat(order.products.map(product => ({ ...product, createdAt: order.createdAt })));
                return acc;
            }, {});
            setOrderData(Object.values(groupedOrders));
        }
    };

    return (
        <div className="pt-24">
            {isAdmin && (
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Filter Orders</h2>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <label htmlFor="email-filter" className="block text-sm font-medium text-gray-700">Filter by Email:</label>
                            <select
                                id="email-filter"
                                value={selectedEmail}
                                onChange={(e) => setSelectedEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Email</option>
                                {filterOptions.emails.map((email) => (
                                    <option key={email} value={email}>{email}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Filter by Date:</label>
                            <select
                                id="date-filter"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Date</option>
                                {filterOptions.dates.map((date) => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {orderData ? (
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Order Data</h1>
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="space-y-4">
                            {orderData.map((order) => (
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
                                            <strong className="font-semibold">Ordered On:</strong> {new Intl.DateTimeFormat('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            }).format(new Date(order.createdAt))}
                                        </div>
                                    </div>
                                    <div>
                                        <strong className="font-semibold">Products:</strong>
                                        <ul className="ml-4 mt-2 space-y-2">
                                            {order.products.map((product) => (
                                                <li key={product._id} className='flex items-center'>
                                                    <img src={product.img} alt="" className='h-20 w-20 rounded' />
                                                    <div className="ml-4">
                                                        <div>{product.title}</div>
                                                        <div>{product.amount} &#x20B9;</div>
                                                        <div>Ordered On: {new Intl.DateTimeFormat('en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        }).format(new Date(product.createdAt))}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
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
