import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import EditForm from './EditForm';
import { GITHUB_REPO_ISSUE_URL } from '../constant/api';
const ListDetail = () => {
  const location = useLocation();
  const [detail, setDetail] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { repoOwner, repo, repoNumber } = location.state;
  useEffect(() => {
    getIssueDetail();
  }, [repoOwner, repo, repoNumber]);
  const popupHandle = async () => {
    console.log('close');
    setShowMore(!showMore);
    await getIssueDetail();
  };

  const getIssueDetail = async () => {
    console.log('again');
    try {
      const response = await axios.get(
        GITHUB_REPO_ISSUE_URL + repoOwner + '&repo=' + repo + '&number=' + repoNumber,
      );
      console.log('get detail data', response.data);
      setDetail((prevState) => ({ ...prevState, ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };
  const popupDelete = async () => {
    console.log('delete');
    try {
      const response = await axios.patch(
        GITHUB_REPO_ISSUE_URL + repoOwner + '&repo=' + repo + '&number=' + repoNumber,
        data,
      );
      console.log('get patch finish data', response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='flex h-screen justify-center mt-10'>
        <div className='relative max-w-xl w-full'>
          <Link to='/'>Go Back</Link>
          <div className='bg-gray-100 p-4 rounded-lg relative justify-items-center items-start'>
            <span className='text-gray-800 text-1xl font-semibold'>{detail.title}</span>
            <p className='mt-2 text-gray-600'>{detail.body}</p>
            <div className='flex justify-end mt-4'>
              <span
                className='text-xl font-medium text-indigo-500'
                onClick={() => setShowMore(!showMore)}
              >
                John Doe
              </span>
            </div>
          </div>
          <div className='absolute top-[60px] right-0 bg-gray-200 w-[22.5%] shadow-lg rounded-md'>
            <div className='flex items-center'>
              <button className='my-2 ml-3' onClick={popupHandle}>
                Edit
              </button>
            </div>
            <div className='flex items-center'>
              <button className='my-2 ml-3' onClick={popupDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMore ? (
        <EditForm
          detailTitle={detail.title}
          detailBody={detail.body}
          repoOwner={repoOwner}
          repo={repo}
          repoNumber={repoNumber}
          popupHandle={popupHandle}
        />
      ) : null}
    </>
  );
};
export default ListDetail;
