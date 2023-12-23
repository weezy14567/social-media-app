
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

function CommentReplys(props) {
  const {
    comments,
    handleReplyClick,
    setCommenterId,
    setCommentId,
    setShouldScroll
  } = props;

  const customFormat = (timestamp) => {
    const secondsAgo = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / 1000
    );

    if (secondsAgo < 60) {
      return `${secondsAgo}s`;
    } else if (secondsAgo < 3600) {
      return `${Math.floor(secondsAgo / 60)}m`;
    } else if (secondsAgo < 86400) {
      return `${Math.floor(secondsAgo / 3600)}hr`;
    } else if (secondsAgo < 604800) {
      return `${Math.floor(secondsAgo / 86400)}w`;
    } else if (secondsAgo < 2592000) {
      return `${Math.floor(secondsAgo / 604800)}mth`;
    } else if (secondsAgo < 31536000) {
      return `${Math.floor(secondsAgo / 2592000)}yr`;
    } else {
      return format(timestamp).slice(0, 3);
    }
  };



 
  

  return (
    <div style={{ width: '100%' }}>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment?.comments?._id}>
              <div className="d-flex gap-2">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid black',
                  }}
                >
                  {' '}
                  <Link to={`/user/${comment.replierId}`}>
                    <img
                      src={`http://localhost:4000/${comment.replierImg}`}
                      alt={''}
                      style={{
                        width: '40px',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  </Link>
                </div>
                <div>
                  <div
                    className="d-flex commentBG flex-column py-1 px-2"
                    style={{
                      borderRadius: '10px',
                    }}
                  >
                    <Link
                      style={{ color: 'inherit' }}
                      className="text-decoration-none "
                      to={`/user/${comment.replierId}`}
                    >
                      <strong
                        className="text-capitalize"
                        style={{ opacity: '0.8' }}
                      >
                        {comment?.replierName}
                      </strong>
                    </Link>

                    <span className="d-inline-block  ">
                      <Link to={`/user/${comment.commenterId}`}>
                       <strong style={{fontSize:"14px"}}> {`@${comment.commenterName}`}{' '}</strong>
                      </Link>{' '}
                      {comment?.comments?.desc}
                    </span>
                  </div>
                  <div
                    style={{ opacity: '0.7' }}
                    className="d-flex text-capitalize mt-1 align-items-center  gap-3 mb-2"
                  >
                    <span>{customFormat(comment?.comments?.createdAt)}</span>

                    <strong style={{ fontSize: '13px' }}>
                      <Link style={{ opacity: '0.7' }} className="text-black" onClick={(e) => {
                            e.preventDefault();
                          setCommentId(comment.comments.commentId);
                          setCommenterId(comment.replierId);
                          handleReplyClick(comment.postId)
                          setShouldScroll(true)
                        }}>
                        reply
                       
                      </Link>
                    </strong>
                    <strong style={{ fontSize: '13px' }}>
                      <Link
                        style={{ opacity: '0.7' }}
                        className="text-black"
                        
                      >
                        like
                      </Link>
                    </strong>
                    <strong style={{ fontSize: '13px' }}>
                      <Link style={{ opacity: '0.7' }} className="text-black">
                        share
                      </Link>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentReplys;
