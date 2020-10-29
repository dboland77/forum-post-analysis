import React from "react";
import Posts from "./Posts";
// import Author from "./Author";
import styles from "./GraphContainer.module.css";

const POSTS_TO_RETRIEVE = 50;

// At 10000 records it is close to being steady state
// At 50,000 records it *is* steady state

function App() {
  return (
      <div className={styles.graphContainer}>
        <Posts         
        numberOfPosts={POSTS_TO_RETRIEVE} />
      </div>

  );
}

export default App;
