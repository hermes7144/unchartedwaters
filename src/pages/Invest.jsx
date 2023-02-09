import React, { useEffect, useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvest((invest) => ({ ...invest, [name]: value }));
  };

  useEffect(() => {
    const targetRound = Math.floor(invest.target / 1000) * 1000;
    const targetMain = Number(targetRound / 1000);
    const targetMinor = invest.target - targetRound;

    const currentRound = Math.floor(invest.current / 1000) * 1000;
    const currentMain = Number(currentRound / 1000);
    const currentMinor = invest.current - currentRound;

    let targetMoney = numList[targetMain] + (targetMain + 1) * 10 * targetMinor;
    let currentMoney = numList[currentMain] + (currentMain + 1) * 10 * currentMinor;

    console.log('targetRound', targetRound);
    console.log('targetMain', targetMain);
    console.log('targetMinor', targetMinor);
    console.log('currentRound', currentRound);

    const reqMoney = isNaN(targetMoney - currentMoney) ? '' : targetMoney - currentMoney;

    if (parseInt(reqMoney, invest.current * 10) === 0 || Math.round((reqMoney / (invest.current * 10)) * 20, 0) === 20) {
      setCount_mono('1번');
    }

    // IF(QUOTIENT(M85,M84*10)=0,ROUNDUP(MOD(M85/(M84*10),1)*20,0)+1&"칸",
    // IF(ROUNDUP(MOD(M85/(M84*10),1)*20,0)=20, QUOTIENT(M85,M84*10)+1 & "번",
    // IF(ROUNDUP(MOD(M85/(M84*10),1)*20,0)=0, QUOTIENT(M85,M84*10) & "번",
    //  QUOTIENT(M85,M84*10) & "번 "& ROUNDUP(MOD(M85/(M84*10),1)*20,0)&"칸")))

    setPrice_mono(reqMoney);
    setPrice_non_Mono(reqMoney * 2);
    setCount_mono(reqMoney / invest.current);
    setCount_non_Mono((reqMoney / invest.current) * 2);
  }, [invest]);
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
        <span>필요금액 비독점</span>
        <input value={count_non_Mono} readOnly />
      </form>
    </section>
  );
}
