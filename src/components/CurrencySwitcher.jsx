"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, fetchExchangeRates } from '@/redux/slice';

const CurrencySwitcher = () => {
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.currency);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    dispatch(setCurrency(newCurrency));
    dispatch(fetchExchangeRates());
  };

  return (
    <select value={currency} onChange={handleCurrencyChange} className='text-black w-20'>
      <option value="INR">&#x20B9; INR</option>
      <option value="USD">&#x24; USD</option>
      <option value="EUR">&#8364; EUR</option>
      <option value="GBP">&#163; GBP</option>
    </select>
  );
};

export default CurrencySwitcher;
