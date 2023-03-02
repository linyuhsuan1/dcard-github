import { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import List from './List';
import Loading from '../../layout/Loading';
import useFetchIssue from '../../hook/useFetchIssue';
import { FetchIssueHook } from '../../hook/useFetchIssue';
import MsgView from '../../layout/MsgView';

const ListWrapper = () => {
  const { search } = useParams<string>();
  const [ lastId, setLastId ] = useState(null);
  const observer = useRef<IntersectionObserver>();
  const [ page, setPage] = useState<number>(1);
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
                  height={window.innerHeight}
                  width={550}
                  itemCount={issueData.length}
                  itemSize={125}
                  itemData={issueData}
                >
                  {({ index, style }) => {
                    if (issueData.length === index + 1) {
                      return (
                        <div style={{ ...style, display: 'flex', alignItems: 'center',borderBottomWidth:'2px' }} ref={lastIssueRef} data-id={issueData[index].id}>
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
                        <div style={{ ...style, display: 'flex', alignItems: 'center',borderBottomWidth:'2px' }}>
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
                  <Loading/>
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
