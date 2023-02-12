import React, { useState } from 'react';
import { addNewCity } from '../api/firebase';
import Button from '../components/ui/Button';

export default function NewWriting() {
  const [city, setCity] = useState({});
  const [check, setCheck] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

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
    addNewCity(city, check)
      // .mutate(
      //   { city },
      //   {
      //     onSuccess: () => {
      //       setSuccess('성공적으로 제품이 추가되었습니다.');
      //       setTimeout(() => {
      //         setSuccess(null);
      //       }, 4000);
      //     },
      //   }
      // )
      .finally(() => setIsUploading(false));
  };
  return (
    <>
      <article className='w-full basis-1/2'>
        <h2 className='text-2xl font-bold my-4 text-center'>새로운 도시 등록</h2>
        {success && <p className='my-2'>✔️{success}</p>}

        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
          <label htmlFor='area'>해역</label>
          <input id='area' name='area' type='text' value={city.area || ''} onChange={handleChange} />
          <label htmlFor='culture'>문화권</label>
          <input id='culture' name='culture' type='text' value={city.culture || ''} onChange={handleChange} />
          <label htmlFor='name'>도시명</label>
          <input id='name' name='name' type='text' value={city.name || ''} onChange={handleChange} />
          <div>
            <label htmlFor='new'>신도시</label>
            <input id='new' name='new' type='checkbox' value={check} onChange={handleCheck} />
          </div>
          <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
        </form>
      </article>
    </>
  );
}
