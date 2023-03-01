import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <div className='flex justify-center'>
        <nav className='bg-blue-dcard px-2 sm:px-4 py-3.5 w-full shadow-lg'>
          <div className='container flex flex-wrap items-center justify-between mx-auto'>
            <Link to='/dcard-github/'>
              <span className='self-center text-xl font-semibold whitespace-nowrap text-white cursor-pointer'>
                Dcard-Github-List
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
export default NavBar;
