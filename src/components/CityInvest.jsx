import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAreas, getCitys, getGoods } from '../api/firebase';
export default function CityInvest({ target, current }) {
  console.log(target, current);
  const { data: areas } = useQuery(['areas'], getAreas);
  const { data: citys } = useQuery(['citys'], getCitys);

  const [selectedAreas, setSelectedAreas] = useState();
  const [selectedCitys, setSelectedCitys] = useState();
  const [filteredcitys, setFilteredcitys] = useState(citys);

  const { isLoading, data: city } = useQuery(['city', selectedCitys], () => getGoods(selectedCitys), { staleTime: Infinity });

  const handleAreas = (e) => {
    setSelectedAreas(e.target.value);
    setSelectedCitys('');
    setFilteredcitys(!e.target.value ? citys : citys.filter((city) => city.city_area === e.target.value));
  };

  const handleCitys = (e) => setSelectedCitys(e.target.value);

  function setPrice(city) {
    switch (setClass(city)) {
      case 1:
        return parseFloat(Math.round((city.goods_price * 1.5).toFixed(1)));
      case 2:
        return parseFloat(Math.round((city.goods_price * 1.3).toFixed(1)));
      case 3:
        return parseFloat(Math.round((city.goods_price * 1.2).toFixed(1)));
      case 4:
        return parseFloat(Math.round((city.goods_price * 1.1).toFixed(1)));
      default:
        return city.goods_price;
    }
  }

  function setClass(city) {
    if (city.goods_highest_point + city.goods_dev_point <= target) return 1;
    else if (city.goods_highest_point * 0.8 + city.goods_dev_point <= target) return 2;
    else if (city.goods_highest_point * 0.6 + city.goods_dev_point <= target) return 3;
    else if (city.goods_highest_point * 0.4 + city.goods_dev_point <= target) return 4;
    else return 5;
  }

  return (
    <article className='w-full basis-1/2 flex flex-col'>
      <h2 className='text-2xl font-bold my-4 text-center'>select</h2>
      <form className='flex flex-col px-12'>
        <label className=' font-bold' htmlFor='areas'>
          해역
        </label>
        <select id='areas' className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' onChange={handleAreas} value={selectedAreas}>
          <option value=''>전체</option>
          {areas && areas.map((area, index) => <option key={index}>{area.area_nm}</option>)}
        </select>
        <label className=' font-bold' htmlFor='areas'>
          도시
        </label>
        <select id='areas' className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none' onChange={handleCitys} value={selectedCitys}>
          <option value=''>전체</option>
          {filteredcitys && filteredcitys.map((city, index) => <option key={index}>{city.city_nm}</option>)}
        </select>
      </form>

      <table className='border-collapse border border-slate-400 w-5/6 mx-auto'>
        <thead>
          <tr>
            <th className='border border-slate-300 p-4'>교역품</th>
            <th className='border border-slate-300 p-4'>출현 발전도</th>
            <th className='border border-slate-300 p-4'>가격</th>
            <th className='border border-slate-300 p-4'>수량</th>
            <th className='border border-slate-300 p-4'>등급</th>
            <th className='border border-slate-300 p-4'>원산물</th>
          </tr>
        </thead>
        <tbody>
          {city && city.length > 0 ? (
            city.map((city, index) => (
              <tr key={index}>
                <td className='border border-slate-300'>{city.goods_nm}</td>
                <td className={city.goods_dev_point > current && city.goods_dev_point <= target ? 'text-red-500 border border-slate-300 text-center' : city.goods_dev_point > current && city.goods_dev_point > target ? 'text-gray-300 border border-slate-300 text-center' : 'border border-slate-300 text-center'}>{city.goods_dev_point}</td>
                <td className='border border-slate-300 p-1 text-center'>{setPrice(city)}</td>
                <td className='border border-slate-300 p-1 text-center'>{city.goods_qty}</td>
                <td className='border border-slate-300 p-1 text-center'>{setClass(city)}</td>
                <td className='border border-slate-300 p-1 text-center'>{city.goods_add ? 'O' : 'X'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='text-center' colspan='5'>
                도시를 선택해주세요.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
  );
}
