import { User } from '@/app/utils/types/types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Toolbar = () => {
  const [open, setOpen] = useState(false);
  const user: User = JSON.parse(localStorage.getItem('user') as string);
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  const togglePopup = () => setOpen((prev) => !prev);

  const logout = () => {
    localStorage.removeItem('user');
    setTimeout(() => navigate('/'), 250);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <>
      <div ref={ref}>
        <div className='bg-[#121212] py-4'>
          <div className='relative flex items-center justify-end px-4'>
            <div>
              <button
                type='button'
                className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50'
                id='menu-button'
                aria-expanded='true'
                aria-haspopup='true'
                onClick={togglePopup}
              >
                {user?.picture && (
                  <img
                    className='w-5 h-5 sm:w-7 sm:h-7 rounded-[50%] align-middle'
                    alt='avatar'
                    src={user?.picture}
                  />
                )}
                <p className='sm:p-1'>{user.name}</p>
                <svg
                  className='-mr-1 size-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  data-slot='icon'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute right-5 -mt-2 w-28 bg-white rounded-lg shadow-lg ring-1 ring-gray-300 transform transition-all duration-300 ease-in-out ${
            open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <ul className='py-1 text-sm text-gray-700'>
            <li>
              <button
                className='w-full text-left px-4 py-2 hover:bg-gray-100'
                onClick={() => navigate('/profile')}
              >
                View Profile
              </button>
            </li>
            <li>
              <button className='w-full text-left px-4 py-2 hover:bg-gray-100' onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Toolbar;
