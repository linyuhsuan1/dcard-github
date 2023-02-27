import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from '../Form/EditForm';
import { apiGetRepoDetail, apiUpdateRepoDetail } from  '../../api/index';
interface RouteParams {
  search: string;
  repo: string;
  number: string;
}
interface IssueDetail {
  state: string;
  html_url: string;
  title: string;
  body:string;
}
const ListDetail = () => {
  const { search, repo, number } = useParams<RouteParams>();
  const [detail, setDetail]= useState<IssueDetail>({ state: '', html_url: '', title: '',body:''});
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getIssueDetail();
  }, [search, repo, number]);
  const issueEdit = async () => {
    setShowMore(!showMore);
    await getIssueDetail();
  };

  const getIssueDetail = async () => {
    try {   
      const response = await apiGetRepoDetail(search,repo,number);
      console.log('get detail data', response.data);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const closeData = {
    title: detail.title,
    body: detail.body,
    state: 'closed',
  };
  const issueDelete = async () => {
    try {
      const response = await apiUpdateRepoDetail(search,repo,number,JSON.stringify(closeData));
      console.log('get delete finish data', response.data);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const closeHandler = () => {
    setShowMore(!showMore);
  };
  const updateDate = async (data: object) => {
    console.log('patch data', data);
    try {
      const response = await apiUpdateRepoDetail(search,repo,number,JSON.stringify(data));
      console.log('get patch finish data', response.data);
      setDetail(response.data);
      closeHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex h-screen justify-center mt-10 group'>
        <div className='relative max-w-xl w-full'>
          <div className='bg-gray-100 p-4 rounded-lg relative justify-items-center items-start break-all'>
            <div className='flex justify-between'>
              <span className='text-xs text-gray-500 font-medium hover:text-blue-dcard cursor-pointer '>
                {search}/{repo} #{number}
              </span>
              <span>{detail.state}</span>
              <div className='relative inline-block group '>
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
            <a href={detail.html_url} target='_blank'>
              <span className='text-blue-600 text-md cursor-pointer  hover:underline underline-offset-1'>
                {detail.title}
              </span>
            </a>
            <p className=' text-gray-700'>{detail.body}</p>
          </div>
          <div className='absolute top-[40px] right-[14px] bg-gray-200 w-[26.5%] shadow-lg rounded-md hidden z-10 group-hover:block'>
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
        </div>
      </div>
      {showMore ? (
        <EditForm
          detailTitle={detail.title}
          detailBody={detail.body}
          closeHandler={closeHandler}
          updateDate={updateDate}
        />
      ) : null}
    </>
  );
};
export default ListDetail;
