import { useEffect, useState } from 'react';
import Toolbar from '@/app/pages/dashboard/components/Toolbar';
import axios from 'axios';
import Card from '@/app/pages/dashboard/components/Card';
import { WeatetherApiResponse } from '@/app/utils/types/types';
import Skeleton from '@/app/pages/dashboard/components/Skeleton';
import { Form, Formik, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'Yup';

const endPoint = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=`;

type InitialValues = {
  location: string;
};

const validationSchema = Yup.object().shape({
  location: Yup.string().required('Required').min(3, 'Too Short!').max(50, 'Too Long!'),
});

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<undefined | WeatetherApiResponse>(undefined);

  const getWeatherData = async (location: string) => {
    const loc = location;
    const url = `${endPoint}${loc}`;
    // console.log(url);
    try {
      const data = await axios.get(url);
      //   console.log(data);
      if (data?.status === 200) {
        setWeatherData(data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkValue = (val: string | number | undefined, str: string): string | undefined => {
    return val ? `${val} ${str}` : undefined;
  };

  const handleSubmit = async (values: InitialValues, props: FormikProps<InitialValues>) => {
    await getWeatherData(values?.location);
    props.resetForm();
    props.setFieldError('location', '');
  };

  useEffect(() => {
    getWeatherData('Chennai');
  }, []);

  return (
    <div className='w-full h-screen text-white  bg-[#121212]'>
      <Toolbar />
      <div className='flex flex-wrap min-h-screen'>
        <div className='w-full m-12 md:m-0 md:w-2/5 bg-[#161616] p-4 md:rounded-r-4xl'>
          <div className='flex justify-center py-4'>
            <Formik
              initialValues={{ location: '' }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleBlur, values }) => (
                <>
                  <Form noValidate>
                    <div className='relative text-gray-300 focus-within:text-gray-400'>
                      <input
                        type='search'
                        name='location'
                        className='py-2 text-sm text-white bg-black-100 border-2 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900'
                        placeholder='Search...'
                        autoComplete='off'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location}
                      />
                      <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                        <button
                          type='submit'
                          className='p-1 focus:outline-none focus:shadow-outline'
                        >
                          <svg
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            className='w-6 h-6'
                          >
                            <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                          </svg>
                        </button>
                      </span>
                    </div>
                    <div className='p-1 text-red-300'>
                      <ErrorMessage name='location' className='text-sm' />
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
          {weatherData ? (
            <div className='flex flex-col justify-start h-full items-center md:pt-8'>
              <img src='//cdn.weatherapi.com/weather/64x64/night/116.png' width={80} />
              <div className='flex'>
                <h4 className='text-4xl font-semibold '>
                  {weatherData?.current && Math.round(weatherData?.current?.temp_c)}&deg;
                </h4>
                <span className='p-1 text-2xl'>C</span>
              </div>
              <div className='p-5'>
                <h3 className='text-4xl font-semibold'>{weatherData?.location?.name}</h3>
                <h4 className='text-xl font-light  text-center'>{weatherData?.location?.region}</h4>
                <h5 className='text-xl font-light text-center'>{weatherData?.location?.country}</h5>
              </div>
              <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
                <div className='flex gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 47.5 47.5'
                    id='cloud'
                    width={25}
                  >
                    <defs>
                      <clipPath id='a'>
                        <path d='M0 38h38V0H0v38Z'></path>
                      </clipPath>
                    </defs>
                    <g clipPath='url(#a)' transform='matrix(1.25 0 0 -1.25 0 47.5)'>
                      <path
                        fill='#b4c3cc'
                        d='M28 29a6.98 6.98 0 0 1-2.015-.298c.005.1.015.197.015.298a5.998 5.998 0 0 1-11.785 1.573A5.974 5.974 0 0 1 12 31a6 6 0 1 1 0-12 5.998 5.998 0 0 1 5.785 4.428A5.975 5.975 0 0 1 20 23c.375 0 .74.039 1.096.104A6.919 6.919 0 0 1 21 22c0-3.865 3.135-7 7-7s7 3.135 7 7a7 7 0 0 1-7 7'
                      ></path>
                      <path
                        fill='#8899a6'
                        d='M32 15a4.98 4.98 0 0 1-1.339-.204c.216.526.339 1.1.339 1.704a4.5 4.5 0 0 1-4.5 4.5 4.459 4.459 0 0 1-2.701-.921A6.497 6.497 0 0 1 17.5 25a6.497 6.497 0 0 1-6.131-4.357A8 8 0 1 1 9 5h23a5 5 0 0 1 5 5 5 5 0 0 1-5 5'
                      ></path>
                    </g>
                  </svg>
                  <p>{weatherData?.current?.condition?.text}</p>
                </div>
                <div className='flex gap-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    viewBox='0,0,256,256'
                  >
                    <g
                      fill='#ffffff'
                      fillRule='nonzero'
                      stroke='none'
                      strokeWidth='1'
                      strokeLinecap='butt'
                      strokeLinejoin='miter'
                      strokeMiterlimit='10'
                      strokeDasharray=''
                      strokeDashoffset='0'
                      fontFamily='none'
                      fontWeight='none'
                      fontSize='none'
                      textAnchor='none'
                    >
                      <g transform='scale(5.12,5.12)'>
                        <path d='M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24.98438,6.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v14.17383c-1.19786,0.42351 -1.99904,1.55565 -2,2.82617c0.00091,0.44693 0.10168,0.88802 0.29492,1.29102l-6.00195,6.00195c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l6.00195,-6.00195c0.403,0.19325 0.84408,0.29401 1.29102,0.29492c1.65685,0 3,-1.34315 3,-3c-0.00178,-1.2698 -0.80282,-2.40095 -2,-2.82422v-14.17578c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z'></path>
                      </g>
                    </g>
                  </svg>
                  <p className='text-md font-light'>
                    {weatherData?.current?.last_updated?.split(' ')[1]}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col justify-start h-full md:pt-40'>
              <Skeleton />
            </div>
          )}
        </div>
        <div className='w-full md:w-3/5 bg-[#121212] p-4'>
          <div className='h-full items-center md:mt-1 p-5 mx-4'>
            <h4 className='text-xl py-4'>Today Highlights</h4>
            <div className='grid grid-cols-1 grid-rows-auto md:grid-cols-3 grid-rows-2 gap-8 '>
              <div>
                <Card title={weatherData?.current?.uv.toString()} desc='UV Index' />
              </div>
              <div>
                <Card
                  title={checkValue(weatherData?.current?.wind_kph, 'KPH')}
                  desc='Wind Status'
                />
              </div>
              <div>
                <Card title={weatherData?.current?.wind_dir} desc='Wind Direction' />
              </div>
              <div>
                <Card title={checkValue(weatherData?.current?.humidity, '%')} desc='Humidity' />
              </div>
              <div>
                <Card title={checkValue(weatherData?.current?.vis_km, 'KM')} desc='Visibility' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
