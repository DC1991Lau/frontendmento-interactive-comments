import { useContext } from "react";
import avatar from "../assets/avatars/image-amyrobson.png";
import { UserContext } from "../context/UserContext";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentsContext } from "../context/CommentsContext";

const newCommentSchema = z.object({
  content: z.string(),
});

type NewCommentInput = z.infer<typeof newCommentSchema>;

interface CommentFormProps {
  id?: number;
  replyingTo?: number;
}

export function CommentForm({ id, replyingTo }: CommentFormProps) {
  const { createComment, replyToComment } = useContext(CommentsContext);
  const { currentUser } = useContext(UserContext);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewCommentInput>({
    resolver: zodResolver(newCommentSchema),
  });

  async function handleNewComment(data: NewCommentInput) {
    const { content } = data;

    if (id) {
      await replyToComment({
        content,
        user: currentUser,
        replyId: id,
        replyingTo,
      });
    } else {
      await createComment({
        content,
      });
    }
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleNewComment)}
      className="bg-white shadow-sm flex items-start justify-between rounded-md p-6 w-full mt-5 gap-4"
    >
      <img src={currentUser?.image.png} alt="" className="h-8 w-8" />
      <input
        type="text"
        className="border rounded-md border-moderate-blue flex-1 h-24 p-4 text-start"
        {...register("content")}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-moderate-blue text-white rounded-md font-medium px-7 py-3 hover:opacity-30 transition-all"
      >
        SUBMIT
      </button>
    </form>
  );
}
