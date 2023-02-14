import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getGoods } from '../api/firebase';

export default function CityInfo({ city_nm }) {
  const { isLoading, data: city } = useQuery(['city', city_nm], () => getGoods(city_nm));
  return (
    <>
      {city && (
        <table>
          <thead>
            <tr>
              <th>교역품</th>
              <th>출현 발전도</th>
              <th>가격</th>
              <th>원산물</th>
            </tr>
          </thead>
          <tbody>
            {city.map((city, index) => (
              <tr key={index}>
                <td>{city.goods_nm}</td>
                <td>{city.goods_dev_point}</td>
                <td>{city.goods_price}</td>
                <td>{city.goods_add ? 'O' : 'X'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
