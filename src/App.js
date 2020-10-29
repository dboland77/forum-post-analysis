import React from "react";
import Posts from "./Posts";
// import Author from "./Author";

const POSTS_TO_RETRIEVE = 50000;

// At 10000 records it is close to being steady state
// At 50,000 records it *is* steady state

function App() {
  return (
    
    <div>
      {/* <h2>
      Welcome to the App
      </h2> */}
      <Posts numberOfPosts={POSTS_TO_RETRIEVE}/>

      {/* <Author/> */}
    </div>
  );
}

export default App;
