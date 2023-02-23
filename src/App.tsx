import { Comment } from "./components/Comment";
import { Container } from "./components/Container";
import "./styles/global.css";

import AppContext from "./context";
import { useContext } from "react";
import { CommentsContext } from "./context/CommentsContext";

function App() {
  return (
    <AppContext>
      <Container />
    </AppContext>
  );
}

export default App;
