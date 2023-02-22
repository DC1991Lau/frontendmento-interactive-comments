import { Comment } from "./components/Comment";
import { Container } from "./components/Container";
import "./styles/global.css";

import data from "../data.json";

function App() {
  return (
    <Container>
      {data.comments.map((comment) => (
        <Comment
          content={comment.content}
          createdAt={comment.createdAt}
          id={comment.id}
          score={comment.score}
          user={comment.user}
          replies={comment.replies}
        />
      ))}
    </Container>
  );
}

export default App;
