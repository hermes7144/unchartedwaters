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
            {citys.map((city) => (
              <tr key={city.id}>
                <td>{city.area}</td>
                <td>{city.culture}</td>
                <td>{city.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
