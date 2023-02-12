import React, { useState } from 'react';
import { addNewItem } from '../api/firebase';
import Button from '../components/ui/Button';

export default function NewItem() {
  const [item, setItem] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    addNewItem(item).finally(() => setIsUploading(false));
  };
  return (
    <>
      <article className='w-full basis-1/2'>
        <h2 className='text-2xl font-bold my-4 text-center'>새로운 아이템 등록</h2>
        {success && <p className='my-2'>✔️{success}</p>}

        <form className='flex flex-col px-12' onSubmit={handleSubmit}>
          <label htmlFor='category'>카테고리</label>
          <input id='category' name='category' type='text' value={item.category || ''} onChange={handleChange} />
          <label htmlFor='name'>카테고리명</label>
          <input id='name' name='name' type='text' value={item.name || ''} onChange={handleChange} />
          <label htmlFor='order'>정렬순서</label>
          <input id='order' name='order' type='text' value={item.order || ''} onChange={handleChange} />
          <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
        </form>
      </article>
    </>
  );
}
