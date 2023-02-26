import React from 'react';
import { useHistory } from 'react-router-dom';

interface IssueLabel {
  id: number;
  name: string;
}

interface ListProps {
  issueTitle: string;
  issueBody: string;
  issueUrl: string;
  issueNumber: number;
  issueLabel: IssueLabel[];
}

const List = React.memo(({ issueTitle, issueBody, issueUrl, issueNumber, issueLabel } : ListProps) => {
  const history = useHistory();
  const issueHandle = (issueNumber, issueUrl) => {
    const [, , repoOwner, repo] = issueUrl.replace('https://', '').split('/');
    console.log('split finish', repoOwner, repo);
    history.push(`/dcard-github/${repoOwner}/${repo}/${issueNumber}`);
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
      <div className='my-4 cursor-pointer' onClick={handleClick}>
        {issueLabel && issueLabel.length !== 0 ? (
          issueLabel.map((item) => {
            return (
              <span
                className='w-4 h-4 p-2 mb-1 mr-4 text-[0.5rem] text-white bg-blue-dcard rounded-full'
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
      <div className='border-b-2 border-white-400'></div>
    </>
  );
});

export default List;
