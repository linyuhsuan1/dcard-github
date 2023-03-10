import { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import List from './List';
import useFetchIssue from '../../hook/useFetchIssue';
import { FetchIssueHook } from '../../hook/useFetchIssue';
import MsgView from '../../layout/MsgView';

const ListWrapper = () => {
  const { search } = useParams<string>();
  const [lastId, setLastId] = useState(null);
  const observer = useRef<IntersectionObserver>();
  const [page, setPage] = useState<number>(1);
  const { loading, issueData, hasMore }: FetchIssueHook = useFetchIssue(lastId, String(search), page);

  const lastIssueRef = useCallback(
    (node:any) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(([entries]) => {
        if (entries.isIntersecting && hasMore && !loading) {
          console.log('isIntersecting true');
          setLastId(node.dataset.id);
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading],
  );
  return (
    <>
      <div className='py-10  flex items-center justify-center'>
      {issueData.length > 0 ? (
        <div className='mx-40'>     
              <div className='bg-gray-100 shadow-lg rounded-lg p-4'>
                <FixedSizeList
                  height={150}
                  width={650}
                  itemCount={issueData.length}
                  itemSize={120}
                  itemData={issueData}
                >
                  {({ index, style }) => {
                    if (issueData.length === index + 1) {
                      return (
                        <div style={style} ref={lastIssueRef} data-id={issueData[index].id}>
                          <List
                            key={index}
                            issueTitle={issueData[index].title}
                            issueUrl={issueData[index].repository_url}
                            issueNumber={issueData[index].number}
                            issueBody={issueData[index].body}
                            issueLabel={issueData[index].labels}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div style={style}>
                          <List
                            key={index}
                            issueTitle={issueData[index].title}
                            issueBody={issueData[index].body}
                            issueNumber={issueData[index].number}
                            issueUrl={issueData[index].repository_url}
                            issueLabel={issueData[index].labels}
                          />
                        </div>
                      );
                    }
                  }}
                </FixedSizeList>
                {loading ? (
                  <div className='flex justify-center'>
                    <svg
                      className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </div>
                ) : null}
              </div>
        </div>
      ) : null }
      { (!loading && issueData.length === 0) ? <MsgView msg='no open issue'/> : null}
      </div>
    </>
  );
};
export default ListWrapper;
