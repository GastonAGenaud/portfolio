import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth/jwt-context';

export const useAuth = () => useContext(AuthContext);
