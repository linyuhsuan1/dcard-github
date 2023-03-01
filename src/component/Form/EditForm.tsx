import { useForm , SubmitHandler} from 'react-hook-form';

interface EditFormProp{
  detailTitle:string;
  closeHandler:(event: React.MouseEvent<HTMLButtonElement>) => void;
  detailBody:string;
  updateData: (data: FormInput) => void;
}

interface FormInput{
  title:string;
  body:string;
}
const EditForm = ({ detailTitle, closeHandler, detailBody, updateData } : EditFormProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      title: detailTitle,
      body: detailBody,
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data:FormInput) => {
    updateData(data);
  };

  return (
    <>
      <div className='fixed top-0 left-0 h-screen w-screen flex flex-col justify-center items-center'>
        <div className='bg-blue-dcard p-4 rounded-lg relative justify-items-center items-start max-w-[500px] w-full'>
          <button className='text-[#07074D]' onClick={closeHandler}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z'
                fill='currentColor'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z'
                fill='currentColor'
              />
            </svg>
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='pb-6 px-9'>
              <div className='mb-5'>
                <span className='my-3 block text-base font-medium text-[#ffffff]'>Title*:</span>
                <input
                  type='text'
                  {...register('title', { required: true })}
                  placeholder='Please type Title'
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                />
                {errors.title && <span className='text-red-500'>Title is required</span>}
                <span className='my-3 block text-base font-medium text-[#ffffff]'>Body*:</span>
                <textarea
                  {...register('body', { required: true , minLength: 30 })}
                  value={watch('body')}
                  placeholder='Please type Body'
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                />
                {errors.body && (
                  <span className='text-red-500'>Must be at least 30 characters</span>
                )}
              </div>
              <div>
                <button
                  className='hover:shadow-form w-full rounded-md bg-blue-200 py-3 px-8 text-center text-base font-semibold text-blue-600 hover:text-white outline-none'
                  type='submit'
                >
                  Send File
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditForm;
