const SButton = ({ handleClick }) => {
  return (
    <>
      <button className='ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600' onClick={handleClick}>
        Search...
      </button>
    </>
  );
};
export default SButton;
