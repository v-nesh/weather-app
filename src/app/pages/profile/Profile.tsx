import { User } from '@/app/utils/types/types';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user: User = JSON.parse(localStorage.getItem('user') as string);
  return (
    <div className='flex w-screen justify-center'>
      <div className='m-10 min-w-md'>
        <div className='rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg'>
          <div className='relative mx-auto w-36 rounded-full'>
            <img className='mx-auto h-auto w-full rounded-full' src={user?.picture ?? ''} alt='' />
          </div>
          <h1 className='my-1 text-center text-xl font-bold leading-8 text-gray-900'>
            {user?.name}
          </h1>
          <h3 className='font-lg text-semibold text-center leading-6 text-gray-600'>
            {user?.email}
          </h3>
          <div className='text-center my-5'>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
