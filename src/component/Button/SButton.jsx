const SButton = ({ handleClick }) => {
  return (
    <>
      <button className='ml-2 rounded-lg bg-blue-dcard p-2 text-white hover:bg-blue-dcardBtn' onClick={handleClick}>
        Search
      </button>
    </>
  );
};
export default SButton;
