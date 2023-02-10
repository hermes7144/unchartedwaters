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
  const [price_mono, setPrice_mono] = useState();
  const [price_non_Mono, setPrice_non_Mono] = useState();
  const [count_mono, setCount_mono] = useState();
  const [count_non_Mono, setCount_non_Mono] = useState();
  const [countRaphael_mono, setRaphaelCount_mono] = useState();
  const [countRaphael_non_Mono, setRaphaelCount_nonMono] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvest((invest) => ({ ...invest, [name]: value }));
  };

  const getRequestMoney = useCallback(() => {
    if (!invest.target || !invest.current || invest.target - invest.current <= 0) return '올바른 값을 입력해주세요.';

    const targetRound = Math.floor(invest.target / 1000) * 1000;
    const targetMain = Number(targetRound / 1000);
    const targetMinor = invest.target - targetRound;
    const targetMoney = numList[targetMain] + (targetMain + 1) * 10 * targetMinor;

    const currentRound = Math.floor(invest.current / 1000) * 1000;
    const currentMain = Number(currentRound / 1000);
    const currentMinor = invest.current - currentRound;
    const currentMoney = numList[currentMain] + (currentMain + 1) * 10 * currentMinor;

    return targetMoney - currentMoney;
  }, [invest]);

  const getCount = useCallback(
    (req, mode) => {
      const countList = {
        독점: 10,
        비독점: 5,
        라파엘독점: 8,
        라파엘비독점: 4,
      };
      const money = req / (invest.current * countList[mode]);
      return `${parseInt(money)}번 ${Math.ceil((money % 1) * 20)}칸`;
    },
    [invest]
  );

  useEffect(() => {
    const req = getRequestMoney();

    if (Number.isInteger(req)) {
      setPrice_mono(req);
      setPrice_non_Mono(req * 2);
      setCount_mono(getCount(req, '독점'));
      setCount_non_Mono(getCount(req, '비독점'));
      setRaphaelCount_mono(getCount(req, '라파엘독점'));
      setRaphaelCount_nonMono(getCount(req, '라파엘비독점'));
    } else {
      setPrice_mono(req);
      setPrice_non_Mono(req);
      setCount_mono(req);
      setCount_non_Mono(req);
      setRaphaelCount_mono(req);
      setRaphaelCount_nonMono(req);
    }
  }, [invest, getCount, getRequestMoney]);

  return (
    <div className='flex'>
      <article className='w-full basis-1/2'>
        <h2 className='text-2xl font-bold my-4 text-center'>Calculator</h2>
        <form className='flex flex-col px-12'>
          <label htmlFor='target'>목표값</label>
          <input id='target' name='target' type='text' pattern='\d*' maxLength='4' value={invest.target ?? ''} onChange={handleChange} />
          <label htmlFor='current'>현재값</label>
          <input id='current' name='current' type='text' pattern='\d*' maxLength='4' value={invest.current ?? ''} onChange={handleChange} />
          <label>필요금액(독점)</label>
          <input value={price_mono} disabled />
          <label>필요금액(비독점)</label>
          <input value={price_non_Mono} disabled />
          <label>투자횟수(독점)</label>
          <input value={count_mono} disabled />
          <label>투자횟수(비독점)</label>
          <input value={count_non_Mono} disabled />
          <label>라파엘 군사투자(독점)</label>
          <input value={countRaphael_mono} disabled />
          <label>라파엘 군사투자(비독점)</label>
          <input value={countRaphael_non_Mono} disabled />
        </form>
      </article>
    </div>
  );
}
