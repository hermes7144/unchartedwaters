import { getAreas, getCitys, getGoods } from '../../api/firebase';
import { InfoContext } from './InfoContext';

export function InfoContextProvider({ children }) {
  return <InfoContext.Provider value={{ getAreas, getCitys, getGoods }}>{children}</InfoContext.Provider>;
}
