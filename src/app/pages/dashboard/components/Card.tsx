import Skeleton from '@/app/pages/dashboard/components/Skeleton';

type CardProps = {
  title: string | number | undefined;
  desc: string;
};

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className='flex flex-col rounded-2xl min-w-40 bg-[#161616] border-2 shadow-xl transition-all duration-300 hover:border-blue-500'>
      {props?.title && props?.desc ? (
        <div className='flex flex-col p-8'>
          <div className='text-2xl font-bold uppercase  text-[#ffffff] pb-3'>{props?.title}</div>
          <div className=' text-base   text-[#fefefe]'>{props?.desc}</div>
        </div>
      ) : (
        <div className='p-4'>
          <Skeleton />
        </div>
      )}
    </div>
  );
};
export default Card;
