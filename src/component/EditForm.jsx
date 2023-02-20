import { useState, useCallback } from 'react';
import axios from 'axios';
import { GITHUB_REPO_ISSUE_URL } from '../constant/api';

const EditForm = ({ detailTitle, detailBody, issueEdit, repoOwner, repo, repoNumber }) => {
  const [title, setTitle] = useState(detailTitle);
  const [body, setBody] = useState(detailBody);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const data = {
    title: title,
    body: body,
    authToken: localStorage.getItem('access_token'),
  };
  const fetchData = useCallback(async () => {
    console.log('patch data', data);
    try {
      const response = await axios.patch(
        GITHUB_REPO_ISSUE_URL + repoOwner + '&repo=' + repo + '&number=' + repoNumber,
        data,
      );
      console.log('get patch finish data', response.data);
      issueEdit();
    } catch (error) {
      console.log(error);
    }
  }, [data, repoOwner, repo, repoNumber]);

  const modifyHandle = useCallback(
    (event) => {
      event.preventDefault();
      // if (title === '' || body.length !== 30) {
      //   return;
      // }
      fetchData();
    },
    [fetchData],
  );

  return (
    <>
      <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center'>
        <div className='bg-blue-800 p-4 rounded-lg relative justify-items-center items-start w-[60%]'>
          <button className='text-[#07074D]' onClick={issueEdit}>
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
          <div className='pb-6 px-9'>
            <div className='mb-5 '>
              <span className='my-3 block text-base font-medium text-[#ffffff]'>Title*:</span>
              <input
                type='text'
                name='Title'
                value={title}
                onChange={handleTitleChange}
                placeholder='Please type Title'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
              <span className='my-3 block text-base font-medium text-[#ffffff]'>Label:</span>
              <input
                name='Label'
                placeholder='Please type and press enter'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
              <span className='my-3 block text-base font-medium text-[#ffffff]'>Body*:</span>
              <textarea
                type='text'
                placeholder='Please type Body'
                value={body}
                onChange={handleBodyChange}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
            </div>
            <div>
              <button
                className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                onClick={modifyHandle}
              >
                Send File
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditForm;
