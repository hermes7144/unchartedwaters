import { useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { AuthContext } from './AuthContext';

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
