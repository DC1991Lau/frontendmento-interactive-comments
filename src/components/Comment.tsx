import { Plus, ArrowArcLeft, PlusMinus, Minus } from "phosphor-react";
import { useState } from "react";

import { CommentForm } from "./CommentForm";

interface UserProps {
  username: string;
  image: { png: string; webp: string };
}

interface CommentsProps {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserProps;
  replyingTo?: string;
  replies?: CommentsProps[];
}

export function Comment({
  content,
  createdAt,
  id,
  score,
  user,
  replyingTo,
  replies,
}: CommentsProps) {
  const [reply, setReply] = useState<boolean>(false);
  const [scoreComment, setScoreComment] = useState<number>(score);

  function handleReply() {
    setReply(!reply);
  }

  function handleUpScore() {
    setScoreComment((state) => state + 1);
  }

  function handleDownScore() {
    setScoreComment((state) => state - 1);
  }

  return (
    <div
      key={id}
      className="mx-auto flex flex-col items-center max-w-[730px] mb-5"
    >
      <div className="bg-white shadow-sm flex items-start justify-between rounded-md p-6">
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
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img src={user.image.png} alt="" className="h-8 w-8" />
              <p className="text-dark-blue font-medium">{user.username}</p>
              <span className="text-grayish-blue">{createdAt}</span>
            </div>
            <button
              className="flex gap-3 text-moderate-blue font-medium"
              onClick={handleReply}
            >
              <ArrowArcLeft />
              <p>Reply</p>
            </button>
          </div>
          {/* Comment Content */}
          <p className="text-grayish-blue leading-6">{content}</p>
        </div>
      </div>
      {replies &&
        replies.map((reply) => (
          <div className="flex mt-5">
            <div className="w-28 border-r mr-11" />
            <Comment
              content={reply.content}
              createdAt={reply.createdAt}
              id={reply.id}
              score={reply.score}
              user={reply.user}
            />
          </div>
        ))}
      {reply && <CommentForm />}
    </div>
  );
}
