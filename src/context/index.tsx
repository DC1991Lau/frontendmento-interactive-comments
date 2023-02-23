import { ReactNode } from "react";
import { CommentsContextProvider } from "./CommentsContext";
import { UserContextProvider } from "./UserContext";

export default function AppContext({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <CommentsContextProvider>{children}</CommentsContextProvider>
    </UserContextProvider>
  );
}
