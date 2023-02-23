import { ReactNode, useContext, useEffect } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

export function Container() {
  const { comments, fetchComments } = useContext(CommentsContext);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-[730px]">
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            id={comment.id}
            score={comment.score}
            user={comment.user}
            replies={comment.replies}
            replyingTo={comment.replyingTo}
          />
        ))}
      <CommentForm />
    </div>
  );
}
