import { React } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <h1>DH Calc.</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/invest'>Invest</Link>

        <Link to='/general'>General</Link>
        <Link to='/info'>Info</Link>
        <Link to='/qna'>QnA</Link>
        {user && user.isAdmin && (
          <Link to='/writing/new'>
            <BsFillPencilFill />
          </Link>
        )}

        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login}></Button>}
        {user && <Button text={'Logout'} onClick={logout}></Button>}
      </nav>
    </header>
  );
}
