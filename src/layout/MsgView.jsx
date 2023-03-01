const ErrorView = ({ msg }) => {
  return (
    <>
      <div className='w-[40%] mt-10 bg-blue-50 rounded-lg p-4 flex justify-center items-center'>
        <span className='text-xl'>{msg}</span>
      </div>
    </>
  );
};

export default ErrorView;
