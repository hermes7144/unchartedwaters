import React from 'react';
import { InfoContextProvider } from '../components/context/InfoContextProvider';
import { InvestContextProvider } from '../components/context/InvestContext';
import InvestCalculator from '../components/InvestCalculator';
import InvestCity from '../components/InvestCity';

export default function Invest() {
  return (
    <InfoContextProvider>
      <InvestContextProvider>
        <div className='flex flex-col md:flex-row'>
          <InvestCalculator />
          <InvestCity />
        </div>
      </InvestContextProvider>
    </InfoContextProvider>
  );
}
