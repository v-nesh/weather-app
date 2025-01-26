import '@/app/styles/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signin from '@/app/pages/sign-in/Signin';
import ProtectedRoutes from '@/app/service/ProtectedRoutes';
import Dashboard from '@/app/pages/dashboard/Dashboard';
import Profile from '@/app/pages/profile/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
