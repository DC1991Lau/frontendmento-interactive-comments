import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface UserData {
  username: string;
  image: { png: string; webp: string };
}

export interface UserContextType {
  currentUser?: UserData;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData>();

  async function fetchCurrentUser() {
    const response = await api.get("/currentUser");
    setCurrentUser(response.data);
  }
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
}
