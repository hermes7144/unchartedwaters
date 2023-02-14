import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addNewItem, getAreas, getCitys } from '../api/firebase';
import Button from '../components/ui/Button';

export default function NewProduct() {
  const { data: areas } = useQuery(['areas'], getAreas);
  const { data: citys } = useQuery(['citys'], getCitys);

  const [city, setCity] = useState({});
  const [check, setCheck] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [selectareas, setSelectAreas] = useState();
  const [selectCitys, setSelectCitys] = useState();

  const handleSelect = (e) => {
    setSelectAreas(e.target.value);
    setSelectCitys('전체');
  };
  const handleSelect2 = (e) => setSelectCitys(e.target.value);

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
          <select id='area' onChange={handleSelect} value={selectareas}>
            <option>전체</option>
            {areas && areas.map((area, index) => <option key={index}>{area.name}</option>)}
          </select>
          <label htmlFor='city'>도시</label>
          <select id='city' onChange={handleSelect2} value={selectCitys}>
            <option>전체</option>
            {citys && citys.filter((city) => selectareas === city.area).map((city, index) => <option key={index}>{city.name}</option>)}
          </select>

          <label htmlFor='name'>교역품</label>
          <input id='name' name='name' type='text' value={city.name || ''} onChange={handleChange} />

          <label htmlFor='grade'>최고등급</label>
          <input id='grade' name='grade' type='text' value={city.grade || ''} onChange={handleChange} />

          <label htmlFor='price'>가격(최고등급기준)</label>
          <input id='price' name='price' type='text' value={city.price || ''} onChange={handleChange} />

          <label htmlFor='n'>판매수량</label>
          <input id='name' name='name' type='text' value={city.name || ''} onChange={handleChange} />

          <label htmlFor='commerce'>등장상업도</label>
          <input id='commerce' name='commerce' type='text' value={city.name || ''} onChange={handleChange} />

          <div>
            <label htmlFor='new'>추가 원산물</label>
            <input id='new' name='new' type='checkbox' value={check} onChange={handleCheck} />
          </div>
          <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
        </form>
      </article>
    </>
  );
}
