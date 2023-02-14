import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCitys } from '../api/firebase';

export default function Citys() {
  const { isLoading, error, data: citys } = useQuery([], getCitys);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {citys && (
        <table>
          <thead>
            <tr>
              <th>해역</th>
              <th>문화권</th>
              <th>도시명</th>
            </tr>
          </thead>
          <tbody>
            {citys.map((city, index) => (
              <tr key={index}>
                <td>{city.city_area}</td>
                <td>{city.city_culture}</td>
                <td>{city.city_nm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
