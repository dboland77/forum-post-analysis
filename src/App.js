import React from "react";
import Posts from "./Posts";

function App() {
  return (
    <div>
      <h2>
        My first Apollo app
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h2>
      <Posts />
    </div>
  );
}

export default App;
