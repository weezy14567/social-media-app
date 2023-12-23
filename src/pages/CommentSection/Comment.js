import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import CommentReplys from './CommentReplys';

import { useSelector } from 'react-redux';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


function Comment(props) {
  const {
    comments,
    commentOpens,
    replys,
    handleCommentReply,
    setCommentId,
    setCommenterId,
    handleReplyClick,
    handleCommentLike,
    setShouldScroll
  } = props;

  const { userInfo } = useSelector((state) => state.user);

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
          comments?.map((comment) => (
            <div className="mb-3" key={comment?.comment?._id}>
              <div className="d-flex gap-2">
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid black',
                  }}
                >
                  <img
                    src={`http://localhost:4000/${comment.commenterImg}`}
                    alt={''}
                    style={{
                      width: '40px',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <div>
                  <div
                    className="d-flex commentBG flex-column py-1 px-2"
                    style={{
                      borderRadius: '10px',
                   
                      position: 'relative',
                      
                    }}
                  >
                    <strong
                      className="text-capitalize"
                      style={{ opacity: '0.8' }}
                    >
                      {comment.commenterName}
                    </strong>
                    <span style={{ wordWrap: 'break-word',}} >{comment?.comment?.desc}</span>
                    {comment?.comment?.likes.length >= 1 && (
                      <span
                        style={{ position: 'absolute', bottom: -4, right: -6 }}
                      >
                        <ThumbUpAltIcon
                          style={{
                            width: '21px',
                            height: '21px',
                            borderRadius: '10px',
                            border: '2px solid white',
                          }}
                          className="bg-primary text-white"
                        />
                        {comment?.comment?.likes?.length}
                      </span>
                    )}
                  </div>

                  <div
                    style={{ opacity: '0.7' }}
                    className="d-flex text-capitalize mt-1 align-items-center  gap-3"
                  >
                    <span>{customFormat(comment?.comment.createdAt)}</span>

                    <strong style={{ fontSize: '13px' }}>
                      <Link
                        onClick={() => {
                          handleReplyClick(comment?.comment.postId);
                          setCommentId(comment.comment._id);
                          setCommenterId(comment.comment.userId);
                          setShouldScroll(true)
                        }}
                        style={{ opacity: '0.7' }}
                        className="text-black"
                      >
                        reply
                      </Link>
                    </strong>
                    <strong style={{ fontSize: '13px' }}>
                      <Link
                        onClick={() =>
                          handleCommentLike(comment.comment?._id, userInfo?._id)
                        }
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
                  {comment?.comment.CommentReplys?.length > 0 && (
                    <div>
                      <Link
                        onClick={() =>
                          handleCommentReply(comment?.comment?._id)
                        }
                        style={{ opacity: '0.6' }}
                        className="d-flex align-items-center gap-2 text-decoration-none text-black"
                      >
                        <SubdirectoryArrowRightIcon />
                        <strong>
                          view all replies{' '}
                          {comment?.comment?.CommentReplys.length}
                        </strong>
                      </Link>
                      {commentOpens === comment?.comment?._id && (
                        <CommentReplys
                          commentOpens={commentOpens}
                          comments={replys}
                          handleReplyClick={handleReplyClick}
                          setCommentId={setCommentId}
                          setCommenterId={setCommenterId}
                          setShouldScroll={setShouldScroll}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;
