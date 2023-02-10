import React, { useCallback, useEffect, useState } from 'react';

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

export default function Invest() {
  const [invest, setInvest] = useState({});
  const [price_mono, setPrice_mono] = useState(0);
  const [price_non_Mono, setPrice_non_Mono] = useState(0);
  const [count_mono, setCount_mono] = useState(0);
  const [count_non_Mono, setCount_non_Mono] = useState(0);
  const [countRaphael_mono, setRaphaelCount_mono] = useState(0);
  const [countRaphael_non_Mono, setRaphaelCount_nonMono] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvest((invest) => ({ ...invest, [name]: value }));
  };

  const getRequestMoney = useCallback(() => {
    const targetRound = Math.floor(invest.target / 1000) * 1000;
    const targetMain = Number(targetRound / 1000);
    const targetMinor = invest.target - targetRound;

    const currentRound = Math.floor(invest.current / 1000) * 1000;
    const currentMain = Number(currentRound / 1000);
    const currentMinor = invest.current - currentRound;

    let targetMoney = numList[targetMain] + (targetMain + 1) * 10 * targetMinor;
    let currentMoney = numList[currentMain] + (currentMain + 1) * 10 * currentMinor;

    return isNaN(targetMoney - currentMoney) ? '' : targetMoney - currentMoney;
  }, [invest]);

  const getCount = useCallback(
    (reqMoney, mode) => {
      const countList = {
        독점: 10,
        비독점: 5,
        라파엘독점: 8,
        라파엘비독점: 4,
      };

      const money = reqMoney / (invest.current * countList[mode]);

      return `${parseInt(money)}번 ${Math.ceil((money % 1) * 20)} 칸`;
    },
    [invest]
  );

  useEffect(() => {
    const reqMoney = getRequestMoney();

    setPrice_mono(reqMoney);
    setPrice_non_Mono(reqMoney * 2);
    setCount_mono(getCount(reqMoney, '독점'));
    setCount_non_Mono(getCount(reqMoney, '비독점'));
    setRaphaelCount_mono(getCount(reqMoney, '라파엘독점'));
    setRaphaelCount_nonMono(getCount(reqMoney, '라파엘비독점'));
  }, [invest, getCount, getRequestMoney]);

  return (
    <section className='w-full '>
      <h2 className='text-2xl font-bold my-4 text-center'>투자계산기</h2>
      <form className='flex flex-col px-12'>
        <span>목표값</span>
        <input name='target' value={invest.target ?? ''} placeholder='목표값' maxLength={4} onChange={handleChange} />
        <span>현재값</span>
        <input name='current' value={invest.current ?? ''} placeholder='현재값' maxLength={4} onChange={handleChange} />
        <span>필요금액(독점)</span>
        <input value={price_mono} readOnly />
        <span>필요금액(비독점)</span>
        <input value={price_non_Mono} readOnly />
        <span>투자횟수(독점)</span>
        <input value={count_mono} readOnly />
        <span>투자횟수(비독점)</span>
        <input value={count_non_Mono} readOnly />
        <span>라파엘 군사투자(독점)</span>
        <input value={countRaphael_mono} readOnly />
        <span>라파엘 군사투자(비독점)</span>
        <input value={countRaphael_non_Mono} readOnly />
      </form>
    </section>
  );
}
