import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addNewItem, getAreas, getCitys } from '../api/firebase';
import Button from '../components/ui/Button';

export default function NewProduct() {
  const { isLoading, error, data: areas } = useQuery([], getAreas);

  const [city, setCity] = useState({});
  const [check, setCheck] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(areas && areas.order === 1);

  const handleSelect = (e) => setSelected(e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity((city) => ({ ...city, [name]: value }));
  };

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    addNewItem(city, check).finally(() => setIsUploading(false));
  };
  return (
    <>
      <article className='w-full basis-1/2'>
        <h2 className='text-2xl font-bold my-4 text-center'>새로운 교역품 등록</h2>
        {success && <p className='my-2'>✔️{success}</p>}

        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
          <label htmlFor='area'>해역</label>
          <select id='area' onChange={handleSelect} value={selected}>
            {areas && areas.map((area, index) => <option key={index}>{area.name}</option>)}
          </select>
          <label htmlFor='city'>도시</label>
          {/* <select id='city'>
            {citys &&
              citys
                .filter((city) => {
                  return selectedAreas === city.area;
                })
                .map((city, index) => <option key={index}>{city}</option>)}
          </select> */}

          <label htmlFor='name'>교역품</label>
          <input id='name' name='name' type='text' value={city.name || ''} onChange={handleChange} />

          <div>
            <label htmlFor='new'>추가 교역품</label>
            <input id='new' name='new' type='checkbox' value={check} onChange={handleCheck} />
          </div>
          <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
        </form>
      </article>
    </>
  );
}
