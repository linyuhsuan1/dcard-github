import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import EditForm from './EditForm';
import { GITHUB_REPO_ISSUE_URL } from '../constant/api';
const ListDetail = () => {
  const location = useLocation();
  const [detail, setDetail] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [modify, setModify] = useState(false);
  const { repoOwner, repo, repoNumber } = location.state;
  useEffect(() => {
    getIssueDetail();
  }, [repoOwner, repo, repoNumber]);
  const issueEdit = async () => {
    if (detail.length > 0) {
      setModify(!modify);
      setShowMore(!showMore);
      await getIssueDetail();
    }
    return;
  };

  const getIssueDetail = async () => {
    try {
      const response = await axios.get(
        GITHUB_REPO_ISSUE_URL + repoOwner + '&repo=' + repo + '&number=' + repoNumber,
      );
      console.log('get detail data', response.data);
      setDetail( response.data );
    } catch (error) {
      console.log(error);
    }
  };
  const issueDelete = async () => {
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
            <div className='flex justify-between'>
              <span className='text-gray-800 text-1xl font-semibold'>{detail.title}</span>
              <div onClick={() => setModify(!modify)}>
                <svg
                  fill='#000000'
                  width='20px'
                  height='20px'
                  viewBox='0 0 1920 1920'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      d='M960 1468.235c93.448 0 169.412 75.965 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.447 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.447-75.964 169.412-169.412 169.412-93.448 0-169.412-75.965-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Z'
                      fillRule='evenodd'
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <p className='mt-2 text-gray-600'>{detail.body}</p>
          </div>
          {modify ? (
            <div className='absolute top-[65px] right-[14px] bg-gray-200 w-[26.5%] shadow-lg rounded-md'>
              <div className='flex items-center'>
                <button className='my-2 ml-3' onClick={issueEdit}>
                  Edit
                </button>
              </div>
              <div className='flex items-center'>
                <button className='my-2 ml-3' onClick={issueDelete}>
                  Delete
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {showMore ? (
        <EditForm
          detailTitle={detail.title}
          detailBody={detail.body}
          repoOwner={repoOwner}
          repo={repo}
          repoNumber={repoNumber}
          issueEdit={issueEdit}
        />
      ) : null}
    </>
  );
};
export default ListDetail;
