import React, { useCallback, useEffect, useState } from 'react';
import CityInvest from '../components/CityInvest';

const numList = {
  0: 0,
  1: 10000,
  2: 30000,
  3: 60000,
  4: 100000,
  5: 150000,
  6: 210000,
  7: 280000,
  8: 360000,
  9: 450000,
};

const Rapael = 1.25;
const nonMonopoly = 2;

export default function Invest() {
  const [target, setTarget] = useState();
  const [current, setCurrent] = useState();
  const [price, setPrice] = useState();

  const getMoney = (input) => {
    const firstNumber = Math.floor(input / 1000);
    const leftNumber = input - firstNumber * 1000;
    return numList[firstNumber] + (firstNumber || 1) * 10 * leftNumber;
  };

  const getRequestMoney = useCallback(() => {
    target && current ? setPrice(getMoney(target) - getMoney(current)) : setPrice(null);
  }, [target, current]);

  const getCount = (money) => getCountText(money / (current * 10));
  const getCountText = (money) => `${parseInt(money)}번 ${Math.ceil((money % 1) * 20)}칸`;

  useEffect(() => {
    getRequestMoney();
  });

  return (
    <div className='flex'>
      <article className='w-full basis-1/2'>
        <h2 className='text-2xl font-bold my-4 text-center'>Calculator</h2>
        <form className='flex flex-col px-12'>
          <label htmlFor='target'>목표값</label>
          <input id='target' name='target' type='text' maxLength='4' value={target || ''} aria-label='target' onChange={(e) => setTarget(e.target.value)} />
          <label htmlFor='current'>현재값</label>
          <input id='current' name='current' type='text' maxLength='4' value={current || ''} aria-label='current' onChange={(e) => setCurrent(e.target.value)} />
          <label>필요금액(독점)</label>
          <input value={price || ''} aria-label='moneyMono' disabled />
          <label>필요금액(비독점)</label>
          <input value={price * nonMonopoly || ''} aria-label='moneyNonMono' disabled />
          <label>투자횟수(독점)</label>
          <input value={(price && getCount(price)) || ''} aria-label='countMono' disabled />
          <label>투자횟수(비독점)</label>
          <input value={(price && getCount(price * nonMonopoly)) || ''} aria-label='countNonMono' disabled />
          <label>라파엘 군사투자(독점)</label>
          <input value={(price && getCount(price * Rapael)) || ''} aria-label='rapaelMono' disabled />
          <label>라파엘 군사투자(비독점)</label>
          <input value={(price && getCount(price * Rapael * nonMonopoly)) || ''} aria-label='rapaelNonMono' disabled />
        </form>
      </article>
      <CityInvest target={target} current={current} />
    </div>
  );
}
