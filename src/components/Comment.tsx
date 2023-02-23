import {
  Plus,
  ArrowArcLeft,
  PlusMinus,
  Minus,
  Trash,
  Pencil,
} from "phosphor-react";
import { useContext, useState } from "react";

import { CommentForm } from "./CommentForm";

import { UserContext, UserData } from "../context/UserContext";
import { formatDistance } from "date-fns";
import { CommentData, CommentsContext } from "../context/CommentsContext";

export function Comment({
  content,
  createdAt,
  id,
  score,
  user,
  replyingTo,
  replies,
}: CommentData) {
  const [reply, setReply] = useState<boolean>(false);
  const [scoreComment, setScoreComment] = useState<number>(score);

  const { currentUser } = useContext(UserContext);
  const { deleteComment, deleteReply } = useContext(CommentsContext);

  function handleReply() {
    setReply(!reply);
  }

  function handleDeleteComment(id: number) {
    if (!replyingTo) {
      console.log("DELETE COMENT");
      deleteComment(id);
    } else {
      deleteReply({ replyId: id, replyingTo });
      console.log("DELETE REPLY");
    }
  }

  function handleUpScore() {
    setScoreComment((state) => state + 1);
  }

  function handleDownScore() {
    setScoreComment((state) => state - 1);
  }

  return (
    <div className="mx-auto flex flex-col items-center w-full mb-5">
      <div className="bg-white shadow-sm flex items-start justify-between rounded-md p-6 w-full">
        {/* Voting */}
        <div className="flex flex-col text-light-grayish-blue items-center justify-between rounded-[10px] py-3 px-3 gap-3 bg-very-light-gray">
          <button onClick={handleUpScore}>
            <Plus />
          </button>
          <span className="text-moderate-blue font-medium">{scoreComment}</span>

          <button onClick={handleDownScore}>
            <Minus />
          </button>
        </div>
        {/* Comment Body */}
        <div className="flex-1 flex flex-col ml-4 gap-3">
          {/* Comment Header */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={user.image.png} alt="" className="h-8 w-8" />
              <p className="text-dark-blue font-medium">{user.username}</p>
              {user.username === currentUser?.username && (
                <div className="bg-moderate-blue text-white text-xs p-1 rounded-md">
                  you
                </div>
              )}
              <span className="text-grayish-blue truncate">
                {formatDistance(Date.parse(createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {user.username !== currentUser?.username ? (
              <button
                className="flex gap-2 text-moderate-blue font-medium"
                onClick={handleReply}
              >
                <ArrowArcLeft />
                <p>Reply</p>
              </button>
            ) : (
              <div className="flex gap-4 items-center">
                <button
                  className="flex gap-2 items-center font-medium text-soft-red hover:text-pale-red transition-all"
                  onClick={() => handleDeleteComment(id)}
                >
                  <Trash className="text-dark-blue" />
                  <p>Delete</p>
                </button>
                <button
                  className="flex gap-2 items-center text-moderate-blue font-medium hover:text-light-grayish-blue transition-all"
                  onClick={handleReply}
                >
                  <Pencil />
                  <p>Edit</p>
                </button>
              </div>
            )}
          </div>
          {/* Comment Content */}
          <p className="text-grayish-blue leading-6">{content}</p>
        </div>
      </div>
      {reply && <CommentForm id={id} replyingTo={replyingTo} />}
      {replies &&
        replies.map((reply) => (
          <div className="flex mt-5">
            <div className="w-28 border-r mr-11" />
            <Comment
              key={reply.id}
              content={reply.content}
              createdAt={reply.createdAt}
              id={reply.id}
              score={reply.score}
              user={reply.user}
              replyingTo={id}
            />
          </div>
        ))}
    </div>
  );
}
