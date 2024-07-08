"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FadeLoader from "react-spinners/FadeLoader";

function PaymentForm() {

    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    let payAmount = data.reduce((total, payment) => total + payment.amount, 0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        state: '',
        city: '',
        zipcode: '',
        email: '',
        products: []
    });

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };

    const isFormValid = () => {
        const { firstName, lastName, phoneNumber, address, state, city, zipcode, email } = formData;
        return firstName && lastName && phoneNumber && address && state && city && zipcode && email;
    };

    const makePayment = async (e) => {
        e.preventDefault();

        // Add products IDs to formData
        const updatedFormData = {
            ...formData,
            products: data.map(item => item._id) // assuming data has the _id of Payment documents
        };

        // let res = await fetch('/api/orders', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(updatedFormData)
        // });
        
        // res = await res.json();
        

        
        if (!isFormValid()) {
            alert("Please fill out all the fields.");
            return;
        }

        const res = await initializeRazorpay();
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
    
        try {
          const response = await fetch("/api/razorpay", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              taxAmt: payAmount
            })
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            alert(`Server error: ${errorData.error}`);
            return;
          }
    
          const data = await response.json();
          console.log('Payment data:', data);
    
          var options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            name: "ECOM Website",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Thank you for your purchase",
            handler: function (response) {
              alert("Razorpay Response: " + response.razorpay_payment_id);
            },
            prefill: {
              name: "Alok Anand",
              email: "admin@ECOM",
              contact: '9999999999'
            },
          };
    
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        } catch (err) {
          console.error('Fetch error:', err);
          alert(`Fetch error: ${err.message}`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('/api/payment', {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are sent
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart data:', error.message);
            }
        }
        getData();
    }, []);

    return (
        <div className="font-[sans-serif] bg-white pt-24">
            <div className="flex max-sm:flex-col gap-12 max-lg:gap-4">
                <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-[calc(100vh-6rem)] sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px] overflow-y-auto scrollbar-hide">
                    <div className="flex flex-col h-full relative">
                        <div className="px-4 py-8 flex-grow">
                            <div className="space-y-4">
                                {loading ? (
                                    <div className='h-[calc(100vh-6rem)] flex justify-center items-center'>
                                        <FadeLoader loading={loading} size={10} color='gray' aria-label="Loading Spinner" data-testid="loader" />
                                    </div>
                                ) : data.length > 0 ? (
                                    <>
                                        {data.map((item, index) => (
                                            <div key={index}>
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-600 rounded-md">
                                                        <img src={item.img} alt={item.title} className="w-full object-contain" />
                                                    </div>
                                                    <div className="w-full">
                                                        <h3 className="text-base text-white">{item.title}</h3>
                                                        <ul className="text-xs text-gray-300 space-y-2 mt-2">
                                                            <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{item.size}</span></li>
                                                            <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.quantity}</span></li>
                                                            <li className="flex flex-wrap gap-4">Amount <span className="ml-auto">{item.amount}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p className='text-white text-2xl text-center'>No Items</p>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-800 w-full p-4">
                            <h4 className="flex flex-wrap gap-4 text-base text-white">Total <span className="ml-auto">₹{payAmount}</span></h4>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
                    <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
                    <form className="mt-8" onSubmit={makePayment}>
                        <div>
                            <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" placeholder="First Name" name='firstName' value={formData.firstName} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                                <div>
                                    <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                                <div>
                                    <input type="number" placeholder="Phone No." name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-base text-gray-800 mb-4">Address</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" placeholder="Address" name='address' value={formData.address} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                                <div>
                                    <input type="text" placeholder="City" name='city' value={formData.city} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                                <div>
                                    <input type="text" placeholder="State" name='state' value={formData.state} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                                <div>
                                    <input type="text" placeholder="Zip Code" name='zipcode' value={formData.zipcode} onChange={handleChange}
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-black" required/>
                                </div>
                            </div>
                            <div className="flex gap-4 max-md:flex-col mt-8">
                                <button type="button" className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent border hover:bg-gray-300 border-gray-400 text-black max-md:order-1" onClick={() => router.back()}>Cancel</button>
                                <button type="submit" className="rounded-md px-6 py-3 w-full text-sm tracking-wide border border-black bg-black hover:bg-white text-white hover:text-black">Complete Purchase</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PaymentForm;
