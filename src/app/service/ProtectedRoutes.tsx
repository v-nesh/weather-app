import { User } from '@/app/utils/types/types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = (): JSX.Element => {
  const user: User = JSON.parse(localStorage.getItem('user') as string);
  return user?.isLoggedIn ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectedRoutes;
