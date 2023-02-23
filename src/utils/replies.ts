import { CommentData } from "../context/CommentsContext";

export function removeObjectWithId(arr: CommentData[], id: number) {
  return arr.filter((obj) => obj.id !== id);
}
