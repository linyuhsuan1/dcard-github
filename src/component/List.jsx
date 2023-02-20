import React from 'react';
import { useHistory } from 'react-router-dom';
const List = React.memo(({ issueTitle, issueBody, issueUrl, issueNumber, issueLabel }) => {
  const history = useHistory();
  const issueHandle = (issueNumber, issueUrl) => {
    const [, , repoOwner, repo] = issueUrl.replace('https://', '').split('/');
    console.log('split finish', repoOwner, repo);
    history.push({
      pathname: '/list',
      state: { repoOwner: repoOwner, repo: repo, repoNumber: issueNumber },
    });
  };

  const handleClick = () => {
    issueHandle(issueNumber, issueUrl);
  };
  const trimIssueBody = (issueContent) => {
    if (issueContent) {
      if (issueContent.length <= 50) {
        return issueContent;
      }
      const trimedIssueContent = issueContent.split('').slice(0, 50).join('');
      return trimedIssueContent + '...';
    }
  };
  return (
    <>
      <div className='mt-2 mb-4' onClick={handleClick}>
        {issueLabel && issueLabel.length !== 0 ? (
          issueLabel.map((item) => {
            return (
              <span
                className='w-4 h-4 p-2 mb-1 mr-4 text-[0.5rem] text-white bg-blue-500 rounded-full'
                key={item.id}
              >
                {item.name}
              </span>
            );
          })
        ) : (
          <></>
        )}
        <div>
          <h1 className='text-gray-800 text-1xl font-semibold mt-1'>{issueTitle}</h1>
          <span>{trimIssueBody(issueBody)}</span>
        </div>
      </div>
    </>
  );
});

export default List;
