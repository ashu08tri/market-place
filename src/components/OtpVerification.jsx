"use client"
import { useEffect, useState } from "react";
import app from "@/firebase";
import { useSelector } from "react-redux";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "sonner";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const allowedCountries = ['us', 'gb', 'in', 'fr'];

const getCountryCode = (currency) => {
  switch (currency) {
      case 'INR':
          return 'in';
      case 'USD':
          return 'us';
      case 'GBP':
          return 'gb';
      case 'EUR':
          return 'fr';
      default:
          return 'in';
  }
};

const OtpVerification = ({onSubmit}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      'size': 'invisible',
      'calback': (response) => {

      },
      'expired-callback': () => {

      }
    });
  }, [auth]);

  const onSignInSubmit = async () => {
    const phoneNumberString = `+${phoneNumber.replace(/\D/g, '')}`;
    if(phoneNumber === ""){
      return toast.warning('Please enter the phone number first');
    }
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberString, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(!otpSent);
      setPhoneNumber('');
      toast.success('Otp Sent!')
    } catch (err) {
      setError(err.message);
      console.log(err);

    }
  };

  const onVerifyCodeSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      onSubmit();
      setOtp('');
      toast.success('OTP verified!')
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div>
      {!otpSent ? (<div id="recaptcha-container"></div>) : null}

      <h3>Enter your phone number</h3>
      <PhoneInput
       country={getCountryCode(currency)}
        value={phoneNumber}
        onChange={(phone) => setPhoneNumber(phone)}
        inputProps={{
          name: 'phoneNumber',
          required: true,
          autoComplete: 'tel',
          className: 'mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm'
        }}
        onlyCountries={allowedCountries}
      />
      <button type="button" onClick={onSignInSubmit} className=" my-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send OTP</button>


      {confirmationResult && (
        <>
          <h3>Enter the OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button onClick={onVerifyCodeSubmit}
            className="my-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Verify OTP</button>
        </>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default OtpVerification;
