import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../lib/axios";
import { removeObjectWithId } from "../utils/replies";
import { UserContext, UserData } from "./UserContext";

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserData;
  replyingTo?: number;
  replies?: CommentData[];
}

export interface CreateCommentData {
  content: string;
  user?: UserData;
}

export interface CreateReplyToCommentData {
  replyId: number;
  replyingTo?: number;
  content: string;
  user?: UserData;
}

export interface DeleteReplyCommentData {
  replyId: number;
  replyingTo: number;
}

export interface CommentsContextType {
  comments: CommentData[] | undefined;
  fetchComments: () => void;
  createComment: (data: CreateCommentData) => void;
  deleteComment: (id: number) => void;
  replyToComment: (data: CreateReplyToCommentData) => void;
  deleteReply: (data: DeleteReplyCommentData) => void;
}

export const CommentsContext = createContext({} as CommentsContextType);

export function CommentsContextProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const { currentUser } = useContext(UserContext);

  async function fetchComments() {
    const response = await api.get("/comments");
    setComments(response.data);
  }

  async function createComment(data: CreateCommentData) {
    const { content, user } = data;
    const response = await api.post("/comments", {
      content,
      score: 0,
      user: currentUser,
      replies: [],
      createdAt: new Date(),
    });

    setComments((state) => [...state, response.data]);
  }

  async function deleteComment(id: number) {
    await api.delete(`/comments/${id}`);

    setComments((state) => state.filter((comment) => comment.id != id));
  }

  async function deleteReply(data: DeleteReplyCommentData) {
    const { replyId, replyingTo } = data;

    const response = await api.get(`/comments/${replyingTo}`);

    let comment = response.data;
    const replies = removeObjectWithId(comment.replies, replyId);

    comment.replies = replies;

    console.log(comment);

    await api.put(`/comments/${replyingTo}`, {
      ...comment,
    });

    await fetchComments();
  }

  async function replyToComment(data: CreateReplyToCommentData) {
    const { content, replyingTo, replyId } = data;
    const response = await api.get(
      `/comments/${replyingTo ? replyingTo : replyId}`
    );
    const comment = response.data;
    const replies = comment.replies;
    replies.push({
      id: Math.floor(Math.random() * 100),
      content,
      score: 0,
      user: currentUser,
      createdAt: new Date(),
      replyingTo,
    });
    const datas = await api.put(
      `/comments/${replyingTo ? replyingTo : replyId}`,
      {
        ...comment,
      }
    );

    await fetchComments();
  }

  return (
    <CommentsContext.Provider
      value={{
        comments,
        createComment,
        deleteComment,
        replyToComment,
        fetchComments,
        deleteReply,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
