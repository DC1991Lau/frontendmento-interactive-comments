import avatar from "../assets/avatars/image-amyrobson.png";

export function CommentForm() {
  return (
    <form className="bg-white shadow-sm flex items-start justify-between rounded-md p-6 w-full mt-5 gap-4">
      <img src={avatar} alt="" className="h-8 w-8" />
      <input
        name=""
        id=""
        className="border rounded-md border-moderate-blue flex-1 h-24"
      />
      <button
        type="submit"
        className="bg-moderate-blue text-white rounded-md font-medium px-7 py-3 hover:opacity-30 transition-all"
      >
        SUBMIT
      </button>
    </form>
  );
}
