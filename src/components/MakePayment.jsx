import React from 'react';

const MakePayment = ({ payAmount }) => {
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

  const makePayment = async () => {
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
          taxAmt: 100,
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
        name: "Indradhanu.online",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you for your test donation",
        image: "https://manuarora.in/logo.png",
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

  return (
    <div>
      <button onClick={makePayment}>Pay 100</button>
    </div>
  );
};

export default MakePayment;
