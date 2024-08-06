"use client"
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, fetchExchangeRates } from '@/redux/slice';
import { usePathname } from 'next/navigation';


const CurrencySwitcher = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const { currency } = useSelector((state) => state.currency);

  

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    dispatch(setCurrency(newCurrency));
    dispatch(fetchExchangeRates());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <select value={currency} onChange={handleCurrencyChange} className='w-20' style={{background: pathname==='/'?(isScrolled ? 'white': 'transparent'):'white', color: pathname==='/'?(isScrolled ? 'black': 'white'):'black'}}>
      <option value="INR" style={{background: pathname==='/'?(isScrolled ? 'white': 'black'):'white'}}>&#x20B9; INR</option>
      <option value="USD" style={{background: pathname==='/'?(isScrolled ? 'white': 'black'):'white'}}>&#x24; USD</option>
      <option value="EUR" style={{background: pathname==='/'?(isScrolled ? 'white': 'black'):'white'}}>&#8364; EUR</option>
      <option value="GBP" style={{background: pathname==='/'?(isScrolled ? 'white': 'black'):'white'}}>&#163; GBP</option>
    </select>
  );
};

export default CurrencySwitcher;
